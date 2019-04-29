// Cart component

import React from 'react'
import ProductListItem from './productListItem.js';
import Counter from './counter.js';
import {connect} from 'react-redux';
import { incrementItem, decrementItem } from '../redux/actions.js'


class Cart extends React.Component{

	render(){
		return (
			<div className="cart">
				<div className="cart-header">
					<h2>Items Added to Cart</h2>
				</div>
				<div className="cart-items">
					{/* Cart Items component */}
					{ this.props.cart.map((product, i) => (
						<div className="cart-item" key={i}>
							<ProductListItem name={product.name} amount={product.price} />
							{/* The counter changes the item's position in an array */}
							<Counter quantity={product.amount} increment={ () => this.props.increment(product) } decrement={ () => this.props.decrement(product) } />
						</div>)) }
					<button onClick={() => this.props.history.push(`/order-summary`) }>To Checkout</button>
				</div>
			</div>
			)
	}
}

// this.props.history.push(`/order-summary`)

const mapStateToProps = (state) => ({
	cart: state.cart
})

const mapDispatchToProps = {
	increment: incrementItem,
	decrement: decrementItem,
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);