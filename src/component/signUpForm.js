// Sign Up component 

import React from 'react';
import { checkValidUsernameFormat , checkValidPasswordFormat } from '../utils/credentials.js';
import { validateUser, saveUser } from '../utils/api.js';
import { connect } from 'react-redux';
import { changeUsername } from '../redux/actions.js';


class SignUpForm extends React.Component{

	// To DO 
	// just make one call for checking avaiables user and savaing user
	// Disabled button not working as intended

	constructor(props){
		super(props);
		this.state = {
			usernameField: "mayank@1mg.com",
			passwordField: "123456",
			confPasswordField: "123456",
			errorMessage: "",
		}
		this.submitBtn = React.createRef();
	}

	handleUsername = (e) => {
		const val = e.target.value;
		// this.submitBtn.current.disabled = val.length < 1 ? true : "";
		this.setState(() => ({
			usernameField: val,
		}));
	}

	handlePassword = (e) => {
		const val = e.target.value;
		const name = e.target.name;
		// this.submitBtn.current.disabled = val.length < 1 ? true : "";
		this.setState(() => ({
			[name]: val,
		}));
	}

	isUserNameAvailable = async (username, password) => {
		const response = await validateUser(username);
		if ( response.message !== "Username doesn't exist" ){
			const errMessage = "This Username already exist, try a different one"
			this.setState(() => ({
				errorMessage: errMessage,
			}))
			return;
		}

		// sends data to backend
		const status = await saveUser(username, password);
		console.log("status of saving is: ",status);
		// redirects to cart
		if( status.message === "successful" ) {
			this.props.onChangeUsername(this.state.usernameField);
			console.log("Imagine sign up was successful and redirected")
		 	// this.props.history.push(`/cart`);
		}
		else{
			console.log(status)
		}
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
		this.isUserNameAvailable(this.state.usernameField, this.state.passwordField);

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
					<input type="submit" onClick={this.handleSubmit} value="Submit" refs={this.submitBtn}/>
					<input type="submit" value="Log In" onClick = {() => this.props.history.push(`/log-in`)}/> 
				</section>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
})


const mapDispatchToProps = {
	onChangeUsername: changeUsername
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUpForm);