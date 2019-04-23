// Router file for routes in node application

const express = require('express')
const router = express.Router();
const data = require('./dummyData.js')


router.get('/', (req,res) => {
	res.send('Hello world from inside router');
})


router.get('/api/products', (req,res) => {
	// Gets products data and sends the array
	res.json(data.products);
})

router.post('/api/', (req,res) => {
	/* validates username and passwords , 
	* sends success if username and password matches
	* else, sends appropriate failed message!
	*/
	console.log("req object  is:",req.body)
	let message = "Username doesn't exist";

	if(req.body.username && req.body.username !== undefined ){
		data.users.forEach( val => {
			if (req.body.username === val.username){
				if( req.body.password === val.password ) message = "success";
				else message = "Invalid password";
			}
		})
	}

	res.json({message});
})


module.exports = router;
