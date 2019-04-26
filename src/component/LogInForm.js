// Log In Form component file

import React from 'react';
import { validateUser } from '../utils/api.js';
import { checkValidUsernameFormat , checkValidPasswordFormat } from '../utils/credentials.js';
import { connect } from 'react-redux';
import { changeUsername } from '../redux/actions.js'



class LogInForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			usernameField: "mayank@1mg.com",
			passwordField: "123456",
			errorMessage: "",
		}
		this.submitBtn = React.createRef();
	//	this.onChangeUsername = this.onChangeUsername.bind(this);
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
			this.props.onChangeUsername(this.state.usernameField);
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

	// disableButton = () => {
	// 	if (this.state.usernameField.length < 1 && this.state.passwordField.length < 1) this.submitBtn.current.disabled = true;
	// 	else this.submitBtn.current.disabled = false;
	// }

	// To Do 
	// Disabled button not working as intended;

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
					<input type="submit" onClick={this.handleSubmit} value="Submit" ref= {this.submitBtn} />
					<input type="submit" value="Sign Up" onClick={() => this.props.history.push(`/sign-up`)}/> 
				</section>
			</div> )
	}
}

const mapStateToProps = (state) => ({
})


const mapDispatchToProps = {
	onChangeUsername: changeUsername
}

export default connect(mapStateToProps,mapDispatchToProps)(LogInForm);