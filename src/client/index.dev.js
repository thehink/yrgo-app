import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import asyncBootstrapper from 'react-async-bootstrapper';

import createStore from 'store/store';

import Routes from 'app/routes';

const history = createBrowserHistory();
const store = createStore(window.__data, history);

import App from 'components/App';


const getRoot = Component => (
  <AppContainer>
    <Provider store={store}>
      <ConnectedRouter history={ history }>
        <Component />
      </ConnectedRouter>
    </Provider>
  </AppContainer>
);

const renderHot = Component => {
  render(
    getRoot(Component),
    document.getElementById('content')
  );
};

asyncBootstrapper(getRoot(Routes)).then(() => {
  // bootstrapping complete
  renderHot(Routes);
});

if (module.hot) {
  module.hot.accept(['app/routes', 'components/App'], () => {
    renderHot(require('app/routes').default);
  });
}
