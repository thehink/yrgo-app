const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');
const connectHistoryApiFallback = require('connect-history-api-fallback');
const httpProxyMiddleware = require('http-proxy-middleware');

const bundler = webpack(webpackConfig);

browserSync({
    port: 4000,
    server: {
        baseDir: 'src',
        middleware: [
            connectHistoryApiFallback({
              verbose: true,
            }),
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
              '/uploads'
            ],
            {
              target: 'http://localhost',
              ws: true,
              changeOrigin: true
            })
        ],
        files: [
          'src/*.html'
        ]
    }
});
