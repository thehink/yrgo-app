import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.client.development';
import connectHistoryApiFallback from 'connect-history-api-fallback';
import httpProxyMiddleware from 'http-proxy-middleware';

import applicationConfiguration from '../src/config';

const bundler = webpack(webpackConfig);

browserSync({
    port: applicationConfiguration.development.webpack.development_server.port,
    cors: true,
    server: false,
    proxy: {
        target: 'localhost:3000',
        middleware: [
            // connectHistoryApiFallback({
            //   verbose: true,
            // }),
            webpackDevMiddleware(bundler, {
                publicPath: webpackConfig.output.publicPath,
                noInfo: false,
                quiet: true,
                stats: {
                    colors: true
                }
            }),
            webpackHotMiddleware(bundler),
            httpProxyMiddleware([
              '/api',
            ],
            {
              target: 'http://localhost/wp-json/wp/v2/',
              ws: true,
              changeOrigin: true
            })
        ]
    }
});
