import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import api from './middleware/wpApi';

import rootReducer from './modules/reducer';

const composeEnhancers =
  typeof window === 'object' && __CLIENT__ && __DEVELOPMENT__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

export default (initialState, history) => {
  const enhancer = composeEnhancers(applyMiddleware(
    thunk,
    api,
    routerMiddleware(history),
    createLogger(),
  ));

  const store = createStore(
      connectRouter(history)(rootReducer),
      initialState,
      enhancer
    );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./modules/reducer', () =>
      store.replaceReducer(connectRouter(history)(require('./modules/reducer').default))
    );
  }

  return store;
};
