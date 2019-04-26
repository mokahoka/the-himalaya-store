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
					if ( !state.cart.length ) return [{ ...action.payload, amount: 1 }];
					else {
						const product = state.cart.filter((val) => val.name === action.payload.name );
						if( !product.length ) return [...state.cart, {...action.payload, amount: 1 }];
						else {
								product.amount += 1;
								return state.cart.filter((val) => val.name !== action.payload.name ).concat(product);
						}
					}
			}
			break;

		case DECREMENT:
			if (true) {		
				const product = state.cart.filter((val) => val.name === action.payload.name );
				if( !product.length ) return [...state.cart];
				else {
					if (product.amount === 0) return state.cart.filter((val) => val.name !== action.payload.name );
					else {
						product.amount -= 1;
						return state.cart.filter((val) => val.name !== action.payload.name ).concat(product);
					}
				}
			}
			break;

		case REMOVE_ITEM:
			return state.cart.filter( (val) => val.name !== action.payload.name )

		default:
			return state
	}
}


const mainReducer = combineReducers({
	username: userReducer,
	cart: cartReducer,
})


export default mainReducer;