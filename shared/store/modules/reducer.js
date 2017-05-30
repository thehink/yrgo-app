import { combineReducers } from 'redux';

import { reducer as wp } from './wordpress';

import feed from './facebook';
import entities from './entities';

const rootReducer = combineReducers({
  entities,
  wp,
  feed,
});

export default rootReducer;
