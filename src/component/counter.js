// Counter component file

import React from 'react';

export default counter = (props) => (
	<div className="counter">
		<div className="decrement" onClick={props.decrement}> - </div>
		<span>{props.quantity}</span>
		<div className="increment" onClick={props.increment}> + </div>
	</div>
	)
