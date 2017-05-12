import path from 'path';
import autoprefixer from 'autoprefixer';

//require('dotenv').config();

const rootFolder = path.resolve(__dirname, '..');

// regular expressions for module.loaders
export const regularExpressions = {
    javascript: /\.js$/,
    scss: /\.scss$/,
    css: /\.css$/,
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
                test: regularExpressions.css,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
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
