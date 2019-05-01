// Credentials validation module

export const checkValidUsernameFormat = (username) => {
	/*checks for valid email format
	* returns valid for valid format
	* returns error message for invalid format
	*/

	if( !username ) return "Email field can't be left blank";
	else {
			// Checks for correct email format
			const pattern = /[\w]+@[\w]+[.][\w]+/;
			const isValid = pattern.test(username);
			if(!isValid) return "Email is incorrect";
		}

	return "valid";

}

export const checkValidPasswordFormat = (password) => {
	/* checks for valid password field
	* returns valid for valid format
	* returns error message for invalid format
	*/

	if( !password ) return "Password field can't be left blank"
	else {
			// Checks for correct password format
			if ( password.length < 6) return "Password should be minimun 6 character long";
		}
	return "valid";
}



