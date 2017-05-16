import { handleActions } from 'redux-actions';

import { combineReducers } from 'redux';
import { schema } from 'normalizr';
import capitalize from 'lodash/capitalize';
import WPAPI from 'wpapi';
import apiRoutes from 'src/config/api-endpoint.json';
import { WP_API } from '../middleware/wpApi';

const site = new WPAPI({
    endpoint: 'http://localhost/wp-json',
    routes: apiRoutes.routes
});


const Schemas = {};

Schemas.type = new schema.Entity('types', {}, {
  idAttribute: type => type.type.toLowerCase()
});

Schemas.taxonomies = new schema.Entity('taxonomies', {}, {
  idAttribute: taxonomy => taxonomy.name.toLowerCase()
});

for(let type in site){
  if(type[0] !== '_' && site.hasOwnProperty(type) && !Schemas[type]){
    Schemas[type] = new schema.Entity(type, {});
  }
}

const request = ([requestType, failureType, successType], namespace, type, collection, params) => ({
  [WP_API]: {
    types: [ requestType, failureType, successType ],
    namespace,
    type,
    collection,
    params,
    schema: Schemas[type]
  }
});

const createWpEntityStore = (name, type, initalParams, namespace = 'wp/v2') => {
  const requestType = `WP/REQUEST/ENTITY/${name}/REQUEST`;
  const successType = `WP/REQUEST/ENTITY/${name}/SUCCESS`;
  const failureType = `WP/REQUEST/ENTITY/${name}/FAILURE`;

  const action = (params, force) => (dispatch, getState) =>  {
    if(!force && getState().wp[name].id){
      return;
    }

    return dispatch(request([
      requestType,
      successType,
      failureType
    ], namespace, type, false, {...initalParams, ...params}));
  }

  const initialState = {
    isFetching: false,
    id: null,
    error: '',
    meta: {}
  };

  const reducer = handleActions({
    [requestType]: (state, action) => ({
      ...state,
      isFetching: true
    }),

    [successType]: (state, {payload, meta}) => ({
      ...state,
      isFetching: false,
      id: payload.result,
      meta,
    }),

    [failureType]: (state, action) => ({
      ...state,
      isFetching: false,
      error: action.error
    })
  }, initialState);

  return {action, reducer};
}

const createWpCollectionStore = (name, type, initalParams, namespace = 'wp/v2') => {
  const requestType = `WP/REQUEST/${name}/REQUEST`;
  const successType = `WP/REQUEST/${name}/SUCCESS`;
  const failureType = `WP/REQUEST/${name}/FAILURE`;

  const deleteRequestType = `WP/DELETE/${name}/REQUEST`;
  const deleteSuccessType = `WP/DELETE/${name}/SUCCESS`;
  const deleteFailureType = `WP/DELETE/${name}/FAILURE`;

  const updateRequestType = `WP/UPDATE/${name}/REQUEST`;
  const updateSuccessType = `WP/UPDATE/${name}/SUCCESS`;
  const updateFailureType = `WP/UPDATE/${name}/FAILURE`;

  const action = (params, force) => (dispatch, getState) =>  {
    if(!force && getState().wp[name].ids.length !== 0){
      return;
    }

    return dispatch(request([
      requestType,
      successType,
      failureType
    ], namespace, type, true, {...initalParams, ...params}));
  }

  const initialState = {
    isFetching: false,
    ids: [],
    error: '',
    meta: {}
  };

  const reducer = handleActions({
    [requestType]: (state, action) => ({
      ...state,
      isFetching: true
    }),

    [successType]: (state, {payload, meta}) => ({
      ...state,
      isFetching: false,
      ids: payload.result,
      meta
    }),

    [failureType]: (state, action) => ({
      ...state,
      isFetching: false,
      error: action.error
    })
  }, initialState);

  return {action, reducer};
}

const collections = [
  {
    name: 'post',
    type: 'posts',
    params: {},
  },
  {
    name: 'course',
    type: 'courses',
    params: {},
  }
];

const actions = {};
const reducers = {};

collections.forEach(collection => {
  let {name, type} = collection;

  if(!name){
    name = type.slice(0, type.length - 1);
  }

  const collectionStore = createWpCollectionStore(`${name}s`, type);

  const entityStore = createWpEntityStore(name, type);

  reducers[name] = entityStore.reducer;
  reducers[`${name}s`] = collectionStore.reducer;
  actions[`fetch${capitalize(name)}`] = entityStore.action;
  actions[`fetch${capitalize(name)}s`] = collectionStore.action;
});

export const reducer = combineReducers(reducers);

export default actions;
