import { normalize, schema } from 'normalizr';
import values from 'lodash/values';
import WPAPI from 'wpapi';
import apiRoutes from 'assets/endpoints.json';
import config from '../../../config';

import NProgress from 'nprogress';

const startProgress = () => process.env.BUILD_FLAG_IS_CLIENT === 'true' && NProgress.start();
const stopProgress = () => process.env.BUILD_FLAG_IS_CLIENT === 'true' && NProgress.done();

export const wpapi = new WPAPI({
  endpoint: config('wordpressApi'),
  routes: apiRoutes.routes,
});

const isArray = obj => Object.prototype.toString.call(obj) === '[object Array]';

const apiFetch = async ({ namespace, type, collection, method = 'get', schema, params, body }) => {
  if (collection) {
    schema = [schema];
  }

  let apiFunction = wpapi._ns[namespace][type]();
  for (let key in params) {
    apiFunction = apiFunction[key](params[key]);
  }

  startProgress();

  try {
    let response = await apiFunction[method](body);
    stopProgress();

    let meta = response._paging;

    if (schema) {
      // hack to fix slug query returning array
      if (isArray(response) && !isArray(schema)) {
        response = response[0];
      }

      return {
        payload: Object.assign({}, normalize(response, schema)),
        meta,
      };
    }
  } catch (e) {
    stopProgress();
    throw new Error(e);
  }
};

export const WP_API = Symbol('WP API');

export default store =>
  next =>
    (action) => {
      const callAPI = action[WP_API];
      if (typeof callAPI === 'undefined') {
        return next(action);
      }

      const { namespace, type, collection, method, params, body, types, schema } = callAPI;

      const actionWith = (data) => {
        const finalAction = Object.assign({}, action, data);
        delete finalAction[WP_API];
        return finalAction;
      };

      const [requestType, successType, failureType] = types;
      next(actionWith({ type: requestType }));

      return apiFetch({ namespace, type, collection, method, params, body, schema }).then(
        ({ payload, meta }) =>
          next(
            actionWith({
              payload,
              meta,
              type: successType,
            })
          ),
        error =>
          next(
            actionWith({
              type: failureType,
              payload: error.response,
              error: error.message || 'Something bad happened',
            })
          )
      );
    };
