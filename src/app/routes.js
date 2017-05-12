import React from 'react';
import { Route, Switch } from 'react-router';

import App from 'components/App';
import Home from 'components/Home';
import NotFound from 'components/NotFound';

export default () => {
  const asd = (
    <App>
      <Switch>
        <Route exact path="/" component={ Home } />

        {/* match post */}
        <Route exact path="/:id(\d+)-:slug" component={ Home } />

        {/* match page */}
        <Route exact path="/(.*)/:slug" component={ Home } />

        <Route component={ NotFound } />
      </Switch>
    </App>
  );

  return asd;
};
