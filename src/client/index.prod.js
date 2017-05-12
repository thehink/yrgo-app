import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
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
      <Provider store={store}>
        <ConnectedRouter history={ history }>
          <Component />
        </ConnectedRouter>
      </Provider>,
    document.getElementById('content')
  );
};

renderHot(component);
