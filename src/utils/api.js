// API module 

const URL = "http://localhost:1337/api";

const validateUser = async (username,password) => {
	const response = fetch(URL, {
							method: "POST",
							body:{
								username,
								password
							}
							})
						.then(res => res.json())
						.then( val => val.message )
						.catch( err => { console.log("Error happanned:", err) 
							return "Some wrong happened at our server , Kindly retry again!" } )


}
