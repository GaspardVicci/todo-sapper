import sirv from 'sirv';
// import polka from 'polka';
var express = require('express')
import compression from 'compression';
var bodyParser = require('body-parser')
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

var app = express() // You can also use Express
app.use(bodyParser.json())

app.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
)

app.listen(PORT, err => {
		if (err) console.log('error', err);
});
