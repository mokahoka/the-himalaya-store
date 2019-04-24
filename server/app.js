// A mock server App

const express = require('express');
const app = express();
const port = 1337;
const routes = require('./router.js');
const bodyParser = require('body-parser');

app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api',(req,res,next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');


	next();
})

// app.get('/', (req,res) => {
// 	console.log('OMG! I just got hit!!');
// 	res.send("Hello world!");
// })
app.use('/',routes);

app.listen(port, () => console.log("Server is listening at: ",port))