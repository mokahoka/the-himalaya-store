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
						<h2>Order Summary</h2>
					</div>
					<div className="order-summary-body">
						{ this.props.cart.map((product,i) => (
									<div className="cart-item" key={i}>
										<ProductListItem name={product.name} amount={product.price} />
										<span>{product.amount}</span>
									</div>)) }
					</div>
					<div className="total-amount">
						<h3>Total</h3>
						<p>{ this.calcTotal() }</p>
					</div>
				</div> )
	}
}

const mapStateToProps = (state) => ({
	cart: state.cart
})


export default connect(mapStateToProps)(OrderSummary);