import capitalize from 'lodash/capitalize';
import WPAPI from 'wpapi';
import apiRoutes from 'src/config/api-endpoint.json';

const site = new WPAPI({
    endpoint: 'http://localhost/wp-json',
    routes: apiRoutes.routes
});

const exports = {};

for(let key in site){
  if(key[0] !== '_' && site.hasOwnProperty(key)){
    exports[`fetch${ capitalize(key) }`] = site[key];
  }
}

const createWpAction = (type, namespace = 'wp/v2') => {
  let action = createAction(`WP/${type}`, async properties => {
    console.log(properties);
    return site[type]();
  });

  const initialState = {
    isFetching: false,
    items: []
  };

  const reducer = handleActions({
    INCREMENT: (state, action) => ({
      counter: state.counter + action.payload
    }),

    DECREMENT: (state, action) => ({
      counter: state.counter - action.payload
    })
  }, initialState);
}

console.log(site, exports);

site.posts().id(12).then(response => {
  console.log(response);
});
