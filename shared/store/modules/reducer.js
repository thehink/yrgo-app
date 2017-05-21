import { combineReducers } from 'redux';

import { reducer as wp } from './wordpress';

import entities from './entities';

const rootReducer = combineReducers({
  entities,
  wp,
});

export default rootReducer;
