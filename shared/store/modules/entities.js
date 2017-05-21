import merge from 'lodash/merge';

const initialState = {
  types: {},
};

export default (state = initialState, action) => {
  if (action.payload && action.payload.entities) {
    return merge({}, state, action.payload.entities);
  }

  return state;
};
