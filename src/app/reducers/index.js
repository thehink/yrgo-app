import { combineReducers } from 'redux';

import { asyncReducer } from 'src/AsyncConnect';

import entities from './entities';

const rootReducer = combineReducers({
  asyncReducer,
  entities
});

export default rootReducer;
