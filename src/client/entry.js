require("babel-core/register");
require("babel-polyfill");

if (__PRODUCTION__) {
  require('./index.prod');
} else {
  require('./index.dev');
}
