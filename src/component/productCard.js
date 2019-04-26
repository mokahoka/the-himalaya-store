// Product card module

import React from 'react';

export default const productCard = (props) => (
	<div className="product-card">
		<div className="product-image">
			<img src={props.image} alt={props.name}/>
		</div>
		<div className="product-detail">
			<h3>{props.name}</h3>
			<p>{props.amount}</p>
		</div>
		<hr/>
		<button onClick="">Add</button>
	</div>
)
