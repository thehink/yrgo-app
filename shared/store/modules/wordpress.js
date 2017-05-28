import { handleActions } from 'redux-actions';

import { combineReducers } from 'redux';
import { schema } from 'normalizr';
import camelCase from 'lodash/camelCase';
import WPAPI from 'wpapi';
import apiRoutes from 'assets/endpoints.json';
import { wpapi, WP_API } from '../middleware/wpApi';
import union from 'lodash/union';

import collections from './wpCollections';

const Schemas = {};

Schemas.type = new schema.Entity(
  'types',
  {},
  {
    idAttribute: type => type.type.toLowerCase(),
  }
);

Schemas.taxonomies = new schema.Entity(
  'taxonomies',
  {},
  {
    idAttribute: taxonomy => taxonomy.name.toLowerCase(),
  }
);

for (let type in wpapi) {
  if (type[0] !== '_' && wpapi.hasOwnProperty(type) && !Schemas[type]) {
    Schemas[type] = new schema.Entity(type, {});
  }
}

const request = ([requestType, failureType, successType], namespace, type, collection, params) => ({
  [WP_API]: {
    types: [requestType, failureType, successType],
    namespace,
    type,
    collection,
    params,
    schema: Schemas[type],
  },
});

const createWpEntityStore = (name, type, initalParams = {}, namespace = 'wp/v2') => {
  const requestType = `WP/REQUEST/ENTITY/${name}/REQUEST`;
  const successType = `WP/REQUEST/ENTITY/${name}/SUCCESS`;
  const failureType = `WP/REQUEST/ENTITY/${name}/FAILURE`;

  const action = (params, force) =>
    (dispatch, getState) => {
      if (
        (!force && (getState().wp[name].id || getState().wp[name].error)) ||
        getState().wp[name].isFetching
      ) {
        return Promise.resolve();
      }

      return dispatch(
        request([requestType, successType, failureType], namespace, type, false, {
          ...initalParams,
          ...params,
        })
      );
    };

  const initialState = {
    isFetching: false,
    id: null,
    error: '',
    meta: {},
  };

  const reducer = handleActions(
    {
      [requestType]: (state, action) => ({
        ...state,
        isFetching: true,
        error: null,
      }),

      [successType]: (state, { payload, meta }) => ({
        ...state,
        isFetching: false,
        id: payload.result,
        meta,
      }),

      [failureType]: (state, action) => ({
        ...state,
        isFetching: false,
        error: action.error,
      }),
    },
    initialState
  );

  return { action, reducer };
};

const createWpCollectionStore = (name, type, initalParams = {}, namespace = 'wp/v2') => {
  const requestType = `WP/REQUEST/${name}/REQUEST`;
  const successType = `WP/REQUEST/${name}/SUCCESS`;
  const failureType = `WP/REQUEST/${name}/FAILURE`;

  const entitySuccessType = `WP/REQUEST/ENTITY/${name}/SUCCESS`;

  const action = (params, force) =>
    (dispatch, getState) => {
      if (!force && getState().wp[`${name}s`].ids.length !== 0) {
        return Promise.resolve();
      }

      return dispatch(
        request([requestType, successType, failureType], namespace, type, true, {
          ...initalParams,
          ...params,
        })
      );
    };

  const initialState = {
    isFetching: false,
    ids: [],
    error: '',
    meta: {},
  };

  const reducer = handleActions(
    {
      [requestType]: (state, action) => ({
        ...state,
        isFetching: true,
      }),

      [successType]: (state, { payload, meta }) => ({
        ...state,
        isFetching: false,
        ids: union(state.ids, payload.result),
        meta,
      }),

      [entitySuccessType]: (state, { payload, meta }) => ({
        ...state,
        isFetching: false,
        ids: union(state.ids, [payload.result]),
        meta,
      }),

      [failureType]: (state, action) => ({
        ...state,
        isFetching: false,
        error: action.error,
      }),
    },
    initialState
  );

  return { action, reducer };
};

const actions = {};
const reducers = {};

collections.forEach((collection) => {
  let { name, type, params, multi = true, single = true } = collection;

  if (!name) {
    name = type.slice(0, type.length - 1);
  }

  if (single) {
    const entityStore = createWpEntityStore(name, type, params);
    reducers[name] = entityStore.reducer;
    actions[camelCase(`fetch ${name}`)] = entityStore.action;
  }

  if (multi) {
    const collectionStore = createWpCollectionStore(name, type, params);
    reducers[`${name}s`] = collectionStore.reducer;
    actions[camelCase(`fetch ${name}s`)] = collectionStore.action;
  }
});

export const reducer = combineReducers(reducers);

export default actions;
