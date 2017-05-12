import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router'

import createStore from 'store/store';

import getRoutes from 'app/routes';

const history = createBrowserHistory();
const store = createStore(window.__data, history);

import App from 'components/App';

const component = getRoutes;

const renderHot = Component => {
  render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={ history }>
          <Component />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('content')
  );
};

renderHot(component);

if (module.hot) {
  module.hot.accept(['app/routes', 'components/App'], () => {
    renderHot(require('app/routes').default);
  });
}
