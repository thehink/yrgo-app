import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from 'app/reducers';
//import giphy from 'middleware/giphy';

const enhancer = compose(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

export default store;
