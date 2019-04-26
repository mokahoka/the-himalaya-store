// Cart component

import React from 'react'

export default class Cart extends React.Component{
	render(){
		return (
			<div className="cart">
				<div className="cart-header">
					<h2>Items Added to Cart</h2>
				</div>
				<div className="cart-items"
					{/* Cart Items component */}
					<button onClick="">To Checkout</button>
				</div>
			</div>
			)
	}
}