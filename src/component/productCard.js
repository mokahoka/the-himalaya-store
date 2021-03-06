// Product card module

import React from 'react';
import {connect} from 'react-redux';
import { incrementItem } from '../redux/actions.js';


const productCard = (props) => (
	<div className="product-card">
		<div className="product-image">
			<img src={props.product.image} alt={props.product.name}/>
		</div>
		<div className="product-detail">
			<h3>{props.product.name}</h3>
			<p>Price {props.product.price}</p>
		</div>
		<button onClick={() => props.addToCart(props.product)}>ADD TO CART</button>
	</div>
)

const mapStateToProps = (state) => ({
})

// Dispatches Add to cart action
const mapDispatchToProps = {
	addToCart: incrementItem
}

export default connect(mapStateToProps,mapDispatchToProps)(productCard);