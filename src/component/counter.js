// Counter component file

import React from 'react';

const counter = (props) => (
	<div className="counter">
		<button className="decrement" onClick={props.decrement}> - </button>
		<p>{props.quantity}</p>
		<button className="increment" onClick={props.increment}> + </button>
	</div>
	)

export default counter;