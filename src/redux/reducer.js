// Redux reducer module

import  {combineReducers} from 'redux';
import { ADD_USERNAME, REMOVE_USERNAME, INCREMENT, DECREMENT, REMOVE_ITEM };


function userReducer(state = "", action){
	switch action.type{
		
		case ADD_USERNAME:
			return action.payload;

		case REMOVE_USERNAME:
			return { username: "" }

		default:
			return state
	}
}

function cartReducer(state = [], action){
	switch action.type{
		
		case INCREMENT:
			const product = state.cart.length === 0 ? action.payload.item 
							: state.cart.filter((val) => val.name !== action.payload.item.name ) 
			product.quantity += 1;
			return product;

		case DECREMENT:
			return { username: "" }

		default:
			return state
	}
}

const mainReducer = combineReducers({
	user: userReducer,
	cart: cartReducer,
})


export default mainReducer;