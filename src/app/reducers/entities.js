import merge from 'lodash/merge'

const initialState = {
  types: {},
};

export default (state = initialState, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}
