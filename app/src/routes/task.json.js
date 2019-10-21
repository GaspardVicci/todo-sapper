// routes/task.json.js
const fetch = require('node-fetch');
let url = 'http://localhost:5000/task'

export async function patch(req, res, next) {

	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Accept', 'application/json');

  let next_status = (req.body.status === "Todo" && "Done") || "Todo"
  console.log("reqbody",req.body)
  var body = {...req.body, "status": next_status}
	const config = {
		method: 'PATCH',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json'
		}
	}

	const res_db = await fetch(url, config)

	const resp = await res_db.json()
	console.log('resp1', resp, config)

	if (resp !== null) {
			res.end(JSON.stringify(resp));
	} else {
		next();
	}
}

export async function post(req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Accept', 'application/json');

	const config = {
		method: 'POST',
		body: JSON.stringify({"name": req.body.name, "status": "Todo"}),
		headers: {
			'Content-Type': 'application/json'
		}
	}
	const res_db = await fetch(url, config)

	const resp = await res_db.json()
	console.log('resp1', resp, config)

	if (resp !== null) {
			res.end(JSON.stringify(resp));
	} else {
		next();
	}
}

