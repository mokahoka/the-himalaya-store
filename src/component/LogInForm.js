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
			usernameField: "",
			passwordField: "",
			errorMessage: "",
		}
		this.usernameField = React.createRef();
		this.passwordField = React.createRef();
		this.submitBtn = React.createRef(); //create reference for submit button
	}

	componentDidMount(){
		// disables button
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
		this.setState(() => ({
			passwordField: val,
		}), () => this.checkSubmitStatus());
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
			if( response.message.search("username") ) this.usernameField.focus();
			else if( response.message.search("password") ) this.passwordField.focus();
		} 
		else if(response.message === "success") {
			// Redirects to cart
			this.props.onChangeUsername(this.state.usernameField);
			this.props.history.push(`/cart`);
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();

		// clears any previous error message
		this.setState( () => ({ errorMessage: ""}) );

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
					<input type="email" value={this.state.usernameField} onChange={this.handleUsername} ref={(r) => this.usernameField = r } placeholder="Enter your email" />
					<label>Password </label>
					<input type="password" value={this.state.passwordField} onChange={this.handlePassword} ref={(r) => this.passwordField = r} placeholder="Enter password" />
				</section>
				<section className="log-in-btns">
					<input type="submit" onClick={this.handleSubmit} value="Submit" ref={this.submitBtn} />
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