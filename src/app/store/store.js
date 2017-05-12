let store = null;

if (__PRODUCTION__) {
  store = require('./store.prod').default;
} else {
  store = require('./store.dev').default;
}

export default store;
