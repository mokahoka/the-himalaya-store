// Cart component

import React from 'react'
import ProductListItem from './productListItem.js';
import Counter from './counter.js';
import {connect} from 'react-redux';
import { incrementItem, decrementItem, removeItem } from '../redux/actions.js'


class Cart extends React.Component{

	render(){
		return (
			<div className="cart">
				<div className="cart-header">
					<h2>Items Added to Cart</h2>
				</div>
				<div className="cart-items">
					{ this.props.cart.map((product, i) => (
						<div className="cart-item" key={i}>
							<ProductListItem name={product.name} amount={product.price} />
							<Counter quantity={product.amount} 
									 increment={ () => this.props.increment(product)}
									 decrement={ () => this.props.decrement(product) } />
							<button onClick={() => this.props.remove(product)}>Remove </button>
						</div>)) }
				</div>
					<button onClick={() => this.props.history.push(`/order-summary`) }>To Checkout</button>	
			</div>
			)
	}
}

// maps ordered cart items to props
const mapStateToProps = (state) => ({
	cart: state.cart
})

// Dispatches increment, decrement, remove item actions
const mapDispatchToProps = {
	increment: incrementItem,
	decrement: decrementItem,
	remove: removeItem,
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);