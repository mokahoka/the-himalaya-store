// Redux Store module

import { createStore } from 'redux';
import mainReducer from './reducer.js';

// initial state of store
const initialState = {
	username: "",
	cart: [],
}

// Redux Store
const store = createStore(mainReducer, initialState ,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);

export default store;
