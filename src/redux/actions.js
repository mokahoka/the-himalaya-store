// Redux actions module


// USERS ACTIONS
export const ADD_USERNAME = "ADD_USERNAME";
export const REMOVE_USERNAME = "REMOVE_USERNAME";

// CART ACTIONS
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const REMOVE_ITEM = "REMOVE_ITEM";

// USER ACTION CREATORS

export const addUsername = (username) => ({
	type: ADD_USERNAME,
	payload: {
		username,
	}
})

export const removeUsername = (username) => ({
	type: REMOVE_USERNAME,
	payload: {
		username,
	}
})


// CART ACTION CREATORS

export const incrementItem = (item) => ({
	type: INCREMENT,
	payload: {
		item,
	}
})

export const decrementItem = (item) => ({
	type: DECREMENT,
	payload: {
		item,
	}
})

export const removeItem = (item) => ({
	type: REMOVE_ITEM,
	payload: {
		item,
	}
})
