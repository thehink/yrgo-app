'use strict'

require("babel-core/register");
require("babel-polyfill");

var minimist = require('minimist');
var path = require('path');
var command_line_arguments = minimist(process.argv.slice(2));

global.__ROOT_FOLDER__ = path.resolve(__dirname, '..', '..');
global.__PRODUCTION__ = command_line_arguments.production;
global.__DEVELOPMENT__ = command_line_arguments.development || process.env.NODE_ENV === 'development';

global.fetch = require('node-fetch');

// Enable ES6
// (ignoring all `build` and `node_modules` folders for speed-up)
require('babel-register')({ ignore: /\/(build|node_modules)\// })

// Run `source/start-server.js`
require('./start.js')
