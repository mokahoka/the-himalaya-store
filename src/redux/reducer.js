// Redux reducer module

import  { combineReducers } from 'redux';
import { CHANGE_USERNAME, REMOVE_USERNAME, INCREMENT, DECREMENT, REMOVE_ITEM } from './actions.js';


// USER REDUCER
function userReducer(state = "", action){
	switch (action.type){

		case CHANGE_USERNAME:
			return action.payload;

		case REMOVE_USERNAME:
			return { username: "" }

		default:
			return state
	}
}

// CART REDUCER
function cartReducer(state = [], action){
	switch (action.type){
		case INCREMENT:
			if (true) {
					if ( !state.length ) return [{ ...action.payload, amount: 1 }];
					else {
						const product = state.filter((val) => val.name === action.payload.name );
						if( !product.length ) return [...state, {...action.payload, amount: 1 }];
						else {
								product[0].amount += 1;
								return state.filter((val) => val.name !== action.payload.name ).concat(product);
						}
					}
			}
			break;

		case DECREMENT:
			if (true) {		
				const product = state.filter((val) => val.name === action.payload.name );
				if( !product.length ) return [...state];
				else {
					if (product[0].amount === 1) return state.filter((val) => val.name !== action.payload.name );
					else {
						product[0].amount -= 1;
						return state.filter((val) => val.name !== action.payload.name ).concat(product);
					}
				}
			}
			break;

		case REMOVE_ITEM:
			return state.filter( (val) => val.name !== action.payload.name )

		default:
			return state
	}
}


const mainReducer = combineReducers({
	username: userReducer,
	cart: cartReducer,
})


export default mainReducer;