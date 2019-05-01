// Router file for routes in node application

const express = require('express')
const router = express.Router();
const data = require('./dummyData.js')


router.get('/', (req,res) => {
	res.send('Hello world from inside router');
})


router.get('/api/products', (req,res) => {
	// Gets products data and sends the result array to client
	res.json(data.products);
})

router.post('/api/', (req,res) => {
	/* validates username and passwords , 
	* sends success if username and password matches
	* else, sends appropriate failed message!
	*/
	let message = "Username doesn't exist";

	if(req.body.username && req.body.username !== undefined ){
		data.users.forEach( val => {
			if (req.body.username === val.username){
				if( req.body.password === val.password ) message = "success";
				else message = "Password is incorrect";
			}
		})
	}

	// Developer feature to monitor responses send to client
	console.log(`For U: ${req.body.username} P: ${req.body.username} , response is ${message}`)

	res.json({message});
})

router.put('/api/', (req, res) => {
	let message = "unsuccessful";
	/* Saves Username and password to DataBase
	*/
	if( req.body.username && req.body.username !== undefined 
		 && req.body.password && req.body.password !== undefined){
			
			const user = {
				username: req.body.username,
				password: req.body.password,
			}
			data.users.push(user);
			console.log(data.users);
			message = "successful";
	}

	// Developer feature to monitor responses send to client
	console.log(`For U: ${req.body.username} P: ${req.body.password} , response is ${message}`)

	res.json({message});
})


module.exports = router;
