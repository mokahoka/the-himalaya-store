// Log In Form component file

import React from 'react';
import { validateUser } from '../utils/api.js';
import { checkValidUsernameFormat , checkValidPasswordFormat } from '../utils/credentials.js';


class LogInForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			usernameField: "mayank@1mg.com",
			passwordField: "123456",
			errorMessage: "",
		}
		this.submitBtn = React.createRef();
	}

	handleUsername = (e) => {
		const val = e.target.value;
		this.submitBtn.current.disabled = val.length < 1 ? true : "";
		this.setState(() => ({
			usernameField: val,
		}));
	}

	handlePassword = (e) => {
		const val = e.target.value;
		this.submitBtn.current.disabled = val.length < 1 ? true : "" ;
		this.setState(() => ({
			passwordField: val,
		}));
	}

	checkUser = async (username, password) => {

		// make get request with username and password
		const response = await validateUser(username,password);

		// check for response message
		// if success => redirect to cart
		// else => update error message
		if(response.message !== "success"){
			this.setState(() => ({
				errorMessage: response.message,
			}))
		} 
		else if(response.message === "success") {
			// Redirects to cart
			console.log("Imagine Redirecting to cart")
			// this.props.history.push(`/cart`);
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		// clears any previous errors
		this.setState( () => ({ errorMessage: ""}) );

		const isUsername = checkValidUsernameFormat(this.state.usernameField); 
		if( isUsername !== "valid") {
			
			this.setState(() =>({
				errorMessage: isUsername
			}) )
			return
		}
		// Validates password
		const isPassword = checkValidPasswordFormat(this.state.passwordField);
		if( isPassword !== "valid") {

			this.setState(() =>({
				errorMessage: isPassword
			}) )
			return
		}

		// validates users credentials
		this.checkUser(this.state.usernameField,this.state.passwordField);
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
					<input type="submit" onClick={this.handleSubmit} value="Submit" ref= {this.submitBtn} disabled />
					<input type="submit" value="Sign Up" onClick={() => this.props.history.push(`/sign-up`)}/> 
				</section>
			</div> )
	}
}

export default LogInForm;