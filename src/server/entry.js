import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import path from 'path';
import createHistory from 'history/createMemoryHistory';
import {Provider} from 'react-redux';

import http from 'http';
import compression from 'compression';

import configuration from 'src/config';

import { ConnectedRouter } from 'connected-react-router'

import createStore from 'app/store';
import Routes from 'app/routes';

import Log from 'src/utils/log';
import Html from '../helpers/Html';

import asyncBootstrapper from 'react-async-bootstrapper';

export default function (parameters) {
    const app = new Express();

    app.use('/', Express.static(path.join(__ROOT_FOLDER__, 'webroot')));

    const server = new http.Server(app);

    const chunks = parameters.chunks();
    const log = Log('webpage renderer'); // eslint-disable-line

    app.use((req, res) => {
        const hydrateOnClient = () => {
            res.send(
                `<!doctype html>\n${ReactDOM.renderToString(<Html assets={chunks} />)}`
            );
        };

        global._env = {};

        if (configuration.disable_ssr) {
            hydrateOnClient();
            return;
        }

        //const client = new ApiClient(req);

        const history = createHistory({
          initialEntries: [ req.originalUrl ]
        });

        const store = createStore({}, history);

        const context = {};

        const component = (
            <Provider store={store}>
              <ConnectedRouter history={ history }>
                <Routes />
              </ConnectedRouter>
            </Provider>
        );

        asyncBootstrapper(component).then(() => {

          const content = ReactDOM.renderToString(
              <Html
                  assets={chunks}
                  component={component}
                  store={store}
                  context={context}
              />
          );

          if (context.status) {
              res.status(context.status);
          } else {
              res.status(200);
          }

          // Fetch cookies recieved during the server API requests
          // and pass it to the client
          // for (const cookie of client.cookies) {
          //     res.set('Set-Cookie', cookie);
          // }

          res.send(`<!doctype html>\n${content}`);
        });

        // loadOnServer(store, component)
        // .then(() => {
        //
        // })
        // .catch(() => {
        //   res.status(500);
        // })
    });

    server.listen(configuration.server.http.port, (error) => {
        if (error) {
            log.error('Webpage rendering server shutdown due to an error', error);
            throw error;
        }

        log.info(`Webpage server is listening at http://localhost:${configuration.server.http.port}`);
    });
}
