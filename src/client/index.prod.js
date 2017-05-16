import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import asyncBootstrapper from 'react-async-bootstrapper';

import createStore from 'store/store';

import Routes from 'app/routes';

const history = createBrowserHistory();
const store = createStore(window.__data, history);

import App from 'components/App';

const container = (
  <Provider store={store}>
    <ConnectedRouter history={ history }>
      <Routes />
    </ConnectedRouter>
  </Provider>
);

asyncBootstrapper(container).then(() => {
  // bootstrapping complete
  render(container, document.getElementById('content'));
});
