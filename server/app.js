// A mock server App

const express = require('express');
const app = express();
const routes = require('./router.js');
const bodyParser = require('body-parser');
const port = 1337;

app.use(bodyParser.json())

// Set's Up CORS headers
app.use('/api',(req,res,next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
})

// Seprate routing module
app.use('/',routes);

app.listen(port, () => console.log("Server is listening at: ",port))