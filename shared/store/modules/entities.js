import merge from 'lodash/merge';
import uniq from 'lodash/uniq';

import collections from './wpCollections';

const initialState = {};

collections.forEach(collection => initialState[collection.type] = {});

export default (state = initialState, action) => {
  if (action.payload && action.payload.entities) {
    return merge({}, state, action.payload.entities);
  }

  return state;
};
