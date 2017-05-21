let store = null;

if (process.env.BUILD_FLAG_IS_DEV === 'true') {
  store = require('./store.dev').default;
} else {
  store = require('./store.prod').default;
}

export default store;
