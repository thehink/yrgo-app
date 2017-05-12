/*
 * This file is part of Giphy React.
 *
 * (c) Yrgo, högre yrkesutbildning Göteborg.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const autoprefixer = require('autoprefixer');
const csswring = require('csswring');

const production = process.env.NODE_ENV === 'production';

const src = path.resolve(__dirname, 'src/app');
const dest = path.resolve(__dirname, 'build');

const postcssPlugins = [
  // Options for postcss. This adds vendor prefixes and compresses sass in production.
  // Possible to add more postcss plugins here if neccessary.
  autoprefixer({
    browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
  }),
].concat(production ? [csswring({ removeAllComments: true })] : []);

const sassOptions = {
  outputStyle: 'expanded',
  includePaths: [
    path.resolve(__dirname, 'node_modules'),
    path.join(src, 'styles'),
  ],
};

module.exports = {
  devtool: production ? undefined : 'cheap-module-source-map',

  entry: []
    .concat(
      production
        ? []
        : ['react-hot-loader/patch', 'webpack-hot-middleware/client']
    )
    .concat([path.join(src, 'entry.js')]),

  output: {
    path: dest,
    publicPath: '/',
    filename: 'static/scripts/[name].[hash:8].js',
  },

  resolve: {
    modules: [
      path.join(src, 'scripts'),
      path.join(src, 'styles'),
      path.join(src, 'media'),
      'node_modules',
    ],
    extensions: ['.js', '.json', '.jsx', '.scss'],
  },

  resolveLoader: {
    moduleExtensions: ['-loader'],
  },

  externals: {
    cheerio: 'window',
    'react/addons': 'react',
    'react/lib/ExecutionEnvironment': 'react',
    'react/lib/ReactContext': 'react',
  },

  module: {
    // Loaders are triggered when an imported file matches a pattern
    // and then process that file according to the loader specified.
    rules: [
      {
        // Fallback loader for all assets except the ones we handle with other loaders.
        // If we add loaders for other filetypes we have to include them in this
        // list of excludes as well.
        exclude: [/\.html$/, /\.jsx?$/, /\.(css|scss)$/, /\.json$/],
        use: {
          loader: 'url',
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
      },
      {
        // Mathches all files that ends with .js
        test: /\.(js|jsx)$/,
        use: [
          {
            // Transpile matching files with babel.
            loader: 'babel',
          },
        ],
        // Ignore files from node_modules to avoid
        // transpiling packages that (probably)
        // already are transpiled.
        exclude: /(node_modules)/,
      },
      {
        test: /\.(css|scss)$/,
        use: production
          ? ExtractTextPlugin.extract({
              fallback: 'style',
              use: [
                {
                  loader: 'css',
                },
                {
                  loader: 'postcss',
                  options: {
                    plugins: postcssPlugins,
                  },
                },
                {
                  loader: 'sass',
                  options: sassOptions,
                },
              ],
            })
          : [
              {
                loader: 'style',
              },
              {
                loader: 'css',
              },
              {
                loader: 'postcss',
                options: {
                  plugins: postcssPlugins,
                },
              },
              {
                loader: 'sass',
                options: sassOptions,
              },
            ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(production ? 'production' : 'development'),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(src, 'templates', 'index.html'),
    }),
  ].concat(
    production
      ? [
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false,
              conditionals: true,
              unused: true,
              comparisons: true,
              sequences: true,
              dead_code: true,
              drop_console: true,
              evaluate: true,
              if_return: true,
              join_vars: true,
              negate_iife: false,
              screw_ie8: true,
            },
            mangle: {
              screw_ie8: true,
            },
            output: {
              comments: false,
              screw_ie8: true,
            },
          }),
          new ExtractTextPlugin('static/css/[name].[contenthash:8].css'),
        ]
      : [new webpack.HotModuleReplacementPlugin()]
  ),
};
