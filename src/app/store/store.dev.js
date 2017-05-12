import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import api from 'app/middleware/api';

import rootReducer from 'app/reducers';

export default (initialState, history) => {
  const enhancer = compose(applyMiddleware(
    thunk,
    api,
    routerMiddleware(history),
    createLogger()
  ));

  const store = createStore(
      connectRouter(history)(rootReducer),
      initialState,
      enhancer
    );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('app/reducers', () =>
      store.replaceReducer(connectRouter(history)(require('app/reducers').default))
    );
  }

  return store;
};
