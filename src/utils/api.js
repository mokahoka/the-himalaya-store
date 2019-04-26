// API module 
import axios from 'axios';

// API Constants
const URL = "http://localhost:1337/api";

export const validateUser = (username,password = "") => {
	
	const response =  axios.post(URL,{
								username,
								password
							})
						.then( val => val.data )
						.catch( err => { console.log("Error happanned:", err) 
							return "Some wrong happened at our server , Kindly retry again!" } )

	return response;
}

export const saveUser = (username,password) => {
	const response =  axios.put(URL,{
								username,
								password
							})
						.then( val => val.data )
						.catch( err => { console.log("Error happanned:", err) 
							return "Some wrong happened at our server , Kindly retry again!" } )

	return response;
}

export const getproducts = () => {
	const response = axios.get(`${URL}/products`)
					 	.then( val => val.data)
					 	.catch( err => { console.log("Error happanned:", err) 
								return "Some wrong happened at our server , Kindly retry again!" } )
	
	console.log(response);

	return response;
}
