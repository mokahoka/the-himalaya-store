// Sign Up component 

import React from 'react';
import { checkValidUsernameFormat , checkValidPasswordFormat } from '../utils/credentials.js';
import { validateUser } from '../utils/api.js';


class SignUpForm extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			usernameField: "mayank@1mg.com",
			passwordField: "123456",
			confPasswordField: "123456",
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
		const name = e.target.name;

		this.setState(() => ({
			[name]: val,
		}));
	}

	isUserNameAvailable = async (username) => {
		const response = await validateUser(username);
		console.log(response)
		if ( response.message !== "Username doesn't exist" ){
			const errMessage = "This Username already exist, try a different one"
			this.setState(() => ({
				errorMessage: errMessage,
			}))
			return;
		}

		// sends data to backend 
		// redirects to cart
		console.log("Imagine sign up was successful and redirected")
	}

	handleSubmit = () => {

		this.setState(() => ({ errorMessage: "" }));

		// Validates Username
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

		// Validates Confirm password
		const isConfirmPassword = checkValidPasswordFormat(this.state.confPasswordField);
		if( isConfirmPassword !== "valid") {
			const errMessage = "Confirm " + isConfirmPassword;
			this.setState(() =>({
				errorMessage: errMessage,
			}) )
			return
		}

		// checks for password and conf password equality
		if( this.state.passwordField !== this.state.confPasswordField ){
			const errMessage = "Mismatch Password and Confirm Password";
			this.setState(() =>({
				errorMessage: errMessage,
			}) )
			return
		}

		// checks for username already exist or not
		this.isUserNameAvailable(this.state.usernameField);

	}

	render(){
		return (
			<div className="sign-up">
				<h2>Sign Up</h2>
				<p> { this.state.errorMessage ? this.state.errorMessage : ""} </p>
				<section className="sign-up-fields">
					<label>Email </label> 
					<input type="email" value={this.state.usernameField} onChange={this.handleUsername} pattern="[\w]+@[\w]+[.][\w]+" placeholder="Enter email" />
					<label>Password </label>
					<input type="password" value={this.state.passwordField} name="passwordField" onChange={this.handlePassword} placeholder="Enter password" />
					<label>Confirm Password</label>
					<input type="password" value={this.state.confPasswordField} name="confPasswordField" onChange={this.handlePassword} placeholder="Confirm password" />
				</section>
				<section className="sign-up-btns">
					<input type="submit" onClick={this.handleSubmit} value="Submit" />
					<input type="submit" value="Log In" /> 
				</section>
			</div>
		)
	}
}

export default SignUpForm;