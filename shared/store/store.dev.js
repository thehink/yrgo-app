import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import api from './middleware/wpApi';

import rootReducer from './modules/reducer';

const IS_CLIENT = process.env.BUILD_FLAG_IS_CLIENT === 'true';
const IS_DEV = process.env.BUILD_FLAG_IS_DEV === 'true';

const composeEnhancers = typeof window === 'object' &&
  IS_CLIENT &&
  IS_DEV &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    {
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }
    )
  : compose;

export default (initialState, history) => {
  const middleware = [thunk, api, routerMiddleware(history)];

  if (IS_CLIENT && IS_DEV) {
    middleware.push(createLogger());
  }

  const enhancer = composeEnhancers(applyMiddleware(...middleware));

  const store = createStore(connectRouter(history)(rootReducer), initialState, enhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./modules/reducer', () =>
      store.replaceReducer(connectRouter(history)(require('./modules/reducer').default)));
  }

  return store;
};
