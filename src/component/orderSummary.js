// Order Summary component
import React from 'react';
import {connect} from 'react-redux';
import ProductListItem from './productListItem.js';


class OrderSummary extends React.Component {

	calcTotal = () => {
		const total = this.props.cart.reduce((acc,item) => acc + item.amount*parseInt(item.price.slice(1))  ,0);
		return total.toString();
	}

	render() {
		return (
				<div className="order-summary">
					<div className="order-summary-header">
						<h1>Order Summary</h1>
					</div>
					<div className="order-summary-body">
						{ this.props.cart.map((product,i) => (
									<div className="cart-item" key={i}>
										<ProductListItem name={product.name} amount={product.price} />
										<p>Quantity {product.amount}</p>
										<p>{`${product.price[0]}${product.amount*parseInt(product.price.slice(1))}`}</p>
									</div>)) }
					</div>
					<div className="total-amount">
						<h3>Total</h3>
						<p>{!this.props.cart[0] ? 0 : this.props.cart[0].price[0] + this.calcTotal() }</p>
					</div>
				</div> )
	}
}

const mapStateToProps = (state) => ({
	cart: state.cart
})


export default connect(mapStateToProps)(OrderSummary);