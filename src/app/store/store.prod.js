import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
import api from './middleware/wpApi';

import rootReducer from './modules/reducer';

export default (initialState, history) => {
  const enhancer = compose(applyMiddleware(
    thunk,
    api,
    routerMiddleware(history)
  ));

  const store = createStore(
      connectRouter(history)(rootReducer),
      initialState,
      enhancer
    );

  return store;
};
