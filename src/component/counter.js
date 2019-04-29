// Counter component file

import React from 'react';

const counter = (props) => (
	<div className="counter">
		<button className="increment" onClick={props.increment}> + </button>
		<p>{props.quantity}</p>
		<button className="decrement" onClick={props.decrement}> - </button>
	</div>
	)

export default counter;