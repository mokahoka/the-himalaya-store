// Redux Store module

import { createStore } from 'redux';
import mainReducer from './reducer.js';

// initial state of store
const initialState = {
	username: "",
	cart = [],
}

// Redux store
const store = createStore(mainReducer, initialState);
