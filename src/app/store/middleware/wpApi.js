import { normalize, schema } from 'normalizr';
import values from 'lodash/values';
import WPAPI from 'wpapi';
import apiRoutes from 'src/config/api-endpoint.json';

const wpapi = new WPAPI({
    endpoint: 'http://localhost/wp-json',
    routes: apiRoutes.routes
});

const API_ROOT = 'http://127.0.0.1/wp-json/wp/v2/';

const apiFetch = async ({namespace, type, collection, method = 'get', schema, params, body}) => {
  if(collection){
    schema = [schema];
  }

  let apiFunction = wpapi._ns[namespace][type]();
  for(let key in params){
    apiFunction = apiFunction[key](params[key]);
  }

  try {
    let response = await apiFunction[method](body);

    let meta = response._paging;

    if(schema){
        return {
          payload: Object.assign({},
            normalize(response, schema),
          ),
          meta,
        }
      }

  } catch (e) {
    throw new Error(e);
  }
}

export const WP_API = Symbol('WP API');

export default store => next => action => {
  const callAPI = action[WP_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const {namespace, type, collection, method, params, body, types, schema } = callAPI

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[WP_API];
    return finalAction;
  }

  const [ requestType, successType, failureType ] = types;
  next(actionWith({ type: requestType }));

  return apiFetch({namespace, type, collection, method, params, body, schema}).then(
    ({payload, meta}) => next(actionWith({
      payload,
      meta,
      type: successType
    })),
    (error) => next(actionWith({
      type: failureType,
      payload: error.response,
      error: error.message || 'Something bad happened'
    }))
  );
};
