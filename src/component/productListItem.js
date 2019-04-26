// Product List Item module

import React from 'react';

export default const productListItem = (props) => (
	<div className="product-list-item">
		<p>{props.name}</p>
		<p>{props.amount}</p>
	</div>
)
