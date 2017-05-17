import path from 'path';
import autoprefixer from 'autoprefixer';
import csswring from 'csswring';
import postcssFlexbugsFixer from 'postcss-flexbugs-fixes';

var autoprefixerBrowsers = require('bootstrap/grunt/postcss').autoprefixer.browsers;

//require('dotenv').config();

const rootFolder = path.resolve(__dirname, '..');

// regular expressions for module.loaders
export const regularExpressions = {
  javascript: /\.js$/,
  css: /^((?!\.global).)*\.(css|scss)$/
};

const fonts = [
  [/\.woff(\?v=\d+\.\d+\.\d+)?$/],
  [/\.woff2(\?v=\d+\.\d+\.\d+)?$/],
  [/\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/]
].map((font) => {
  const rule = {
    test: font[0],
    loader: 'file-loader'
  };

  return rule;
});

const postcssPlugins = [
  // Options for postcss. This adds vendor prefixes and compresses sass in production.
  // Possible to add more postcss plugins here if neccessary.
  postcssFlexbugsFixer,
  autoprefixer({
    browsers: autoprefixerBrowsers,
  }),
  csswring({ removeAllComments: true })
];

const cssOptions = {
  modules: true,
  sourceMap: true,
  importLoaders: 2,
  localIdentName: '[name]__[local]___[hash:base64:5]'
};

const sassOptions = {
  outputStyle: 'expanded',
  includePaths: [
    path.join(rootFolder, 'node_modules'),
    path.join(rootFolder, 'src', 'styles'),
  ],
};

const assetsPath = path.resolve(rootFolder, 'webroot', 'build', 'client');

const configuration = {
  // resolve all relative paths from the project root folder
  context: path.join(rootFolder),

  // https://webpack.github.io/docs/multiple-entry-points.html
  entry: {
    main: ['babel-polyfill', './src/client/entry.js'],
  },

  output: {
    // filesystem path for static files
    path: assetsPath,

    // network path for static files
    publicPath: '/build/client/',

    // file name pattern for entry scripts
    filename: '[name].[hash].js',

    // file name pattern for chunk scripts
    chunkFilename: '[name].[hash].js'
  },

  module: {
    rules: [
      {
        exclude: [/\.html$/, /\.(js|jsx)?$/, /\.(css|scss)$/, /\.json$/],
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        }],
      },
      {
        test: regularExpressions.javascript,
        // include: [path.resolve(rootFolder, 'code')],
        // exclude: path.resolve(rootFolder, 'node_modules'),
        exclude: /node_modules/,
        loaders: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.global\.(css|scss)$/,  // only files with .global will go through this loader. e.g. app.global.css
        loaders: [
          'style-loader',
          'css-loader?sourceMap&importLoaders=2',
          {
            loader: 'postcss-loader',
            options: {
              plugins: postcssPlugins,
            },
          },
          {
            loader: 'sass-loader',
            options: sassOptions,
          }
        ]
      },
      {
        test: regularExpressions.css,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              ...cssOptions
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: postcssPlugins,
            },
          },
          {
            loader: 'sass-loader',
            options: sassOptions,
          }
        ]
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          'img-loader',
          'file-loader'
        ]
      },
      {
        test: /\.(mo|po)$/,
        loader: 'binary-loader'
      },
      ...fonts
    ]
  },

  resolve: {
    modules: [
      path.resolve(rootFolder, 'src', 'app'),
      path.resolve(rootFolder, 'src/app', 'styles'),
      path.resolve(rootFolder, 'src/app', 'media'),
      path.resolve(rootFolder, 'src'),
      path.resolve('node_modules')
    ],
    alias: {
      src: path.resolve(rootFolder, 'src'),
      app: path.resolve(rootFolder, 'src', 'app'),
      components: path.resolve(rootFolder, 'src/app/components'),
    }
  },

  plugins: []
};

export default configuration;
