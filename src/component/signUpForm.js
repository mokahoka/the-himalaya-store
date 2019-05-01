// Sign Up component 

import React from 'react';
import { checkValidUsernameFormat , checkValidPasswordFormat } from '../utils/credentials.js';
import { validateUser, saveUser } from '../utils/api.js';
import { connect } from 'react-redux';
import { changeUsername } from '../redux/actions.js';


class SignUpForm extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			usernameField: "",
			passwordField: "",
			confPasswordField: "",
			errorMessage: "",
		}
		this.usernameField = React.createRef();
		this.passwordField = React.createRef();
		this.confirmPasswordField = React.createRef();
		this.submitBtn = React.createRef(); //create reference for submit button
	}

	componentDidMount(){
		// disables Submit button
		this.checkSubmitStatus();
	}

	checkSubmitStatus = () => {
		this.submitBtn.current.disabled = this.state.usernameField && this.state.passwordField ? false : true;
		this.submitBtn.current.style.backgroundColor = this.submitBtn.current.disabled ? "grey" : "";
	}

	handleUsername = (e) => {
		const val = e.target.value;
		this.setState(() => ({
			usernameField: val,
		}), () => this.checkSubmitStatus());
	}

	handlePassword = (e) => {
		const val = e.target.value;
		const name = e.target.name;
		this.setState(() => ({
			[name]: val,
		}), () => this.checkSubmitStatus());
	}

	isUserNameAvailable = async (username, password) => {
		const response = await validateUser(username);
		if ( response.message !== "Username doesn't exist" ){
			const errMessage = "This Username already exist, try a different one"
			this.setState(() => ({
				errorMessage: errMessage,
			}))
			this.usernameField.focus();
			return;
		}

		// sends saves user to server
		const status = await saveUser(username, password);
		// redirects to cart if passed,
		// prints error message if failed
		if( status.message === "successful" ) {
			this.props.onChangeUsername(this.state.usernameField);
		 	this.props.history.push(`/cart`);
		}
		else{
			this.setState(() => ({
				errorMessage: status,
			}))
		}
	}

	handleSubmit = () => {

		// clears any previous error message
		this.setState(() => ({ errorMessage: "" }));

		// Validates Username
		const isUsername = checkValidUsernameFormat(this.state.usernameField); 
		if( isUsername !== "valid") {
			this.setState(() =>({
				errorMessage: isUsername
			}) )
			this.usernameField.focus();
			return
		}

		// Validates password
		const isPassword = checkValidPasswordFormat(this.state.passwordField);
		if( isPassword !== "valid") {
			this.setState(() =>({
				errorMessage: isPassword
			}) )
			this.passwordField.focus();
			return
		}

		// Validates Confirm password
		const isConfirmPassword = checkValidPasswordFormat(this.state.confPasswordField);
		if( isConfirmPassword !== "valid") {
			const errMessage = "Confirm " + isConfirmPassword;
			this.setState(() =>({
				errorMessage: errMessage,
			}) )
			this.confirmPasswordField.focus();
			return
		}

		// checks for password and conf password equality
		if( this.state.passwordField !== this.state.confPasswordField ){
			const errMessage = "Mismatch Password and Confirm Password";
			this.setState(() =>({
				errorMessage: errMessage,
			}) )
			this.passwordField.focus();
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
					<input type="email" value={this.state.usernameField} onChange={this.handleUsername} ref={(r) => this.usernameField = r} placeholder="Enter email" />
					<label>Password </label>
					<input type="password" value={this.state.passwordField} name="passwordField" onChange={this.handlePassword} ref={(r) => this.passwordField = r} placeholder="Enter password" />
					<label>Confirm Password</label>
					<input type="password" value={this.state.confPasswordField} name="confPasswordField" onChange={this.handlePassword} ref={(r) => this.confirmPasswordField = r} placeholder="Confirm password" />
				</section>
				<section className="sign-up-btns">
					<input type="submit" onClick={this.handleSubmit} value="Submit" ref={this.submitBtn} />
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