// Log In Form component file

import React from 'react';

class LogInForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			usernameField: "",
			passwordField: "",
			errorMessage: "",
		}
	}

	handleUsername = (e) => {
		const val = e.target.value;
		this.setState(() => ({
			usernameField: val,
		}));
	}

	handlePassword = (e) => {
		const val = e.target.value;
		this.setState(() => ({
			passwordField: val,
		}));
	}

	handleSubmit = (e) => {
		e.preventDefault();
		// clears any previous errors
		this.setState( () => ({ errorMessage: ""}) );

		// Validates Username
		if( !this.state.usernameField ) {
			this.setState(() => ({
				errorMessage: "Email field can't be left blank"
			}))
			return;
		} else {
			// Checks for correct email format
			const pattern = /[\w]+@[\w]+[.][\w]+/;
			const isValid = pattern.test(this.state.usernameField);
			if(!isValid) {
				this.setState(() => ({
				errorMessage: "Email is incorrect"
				}))
				return;
			}  

		}

		// Validates password
		if( !this.state.passwordField ) {
			this.setState(() => ({
				errorMessage: "Password field can't be left blank"
			}))
			return;
		} else {
			// Checks for correct password format
			if ( this.state.passwordField.length < 6) {
				this.setState(() => ({
				errorMessage: "Password is incorrect",
				}))
				return;
			}
		}

		// make get request with username and password
		// check for response message
		// if success => redirect to cart
		// else => update error message


		alert("Reached here")
	}

	render(){
		return( 
			<div className="log-in">
				<h2>Log In</h2>
				<p> { this.state.errorMessage ? this.state.errorMessage : ""} </p>
				<section className="log-in-fields">
					<label>Email </label> 
					<input type="email" value={this.state.usernameField} onChange={this.handleUsername} pattern="[\w]+@[\w]+[.][\w]+" placeholder="Enter your email" />
					<label>Password </label>
					<input type="password" value={this.state.passwordField} onChange={this.handlePassword} placeholder="Enter password" />
				</section>
				<section className="log-in-btns">
					<input type="submit" onClick={this.handleSubmit} value="Submit" />
					<input type="submit" value="Sign Up" /> 
				</section>
			</div> )
	}
}

export default LogInForm;