// routes/tasks.json.js
const fetch = require('node-fetch');
let base_url = 'http://localhost:5000/tasks'

export async function get(req, res, next) {

	var url = base_url + '?' + encodeURIComponent('where={"status":"in("(\'Todo\',\'Done\’)")"}')
	const res_tasks = await fetch(url)
	const tasks = await res_tasks.json()
	// let tasks = {
	// 	"todo": ["Sortir les poubelles", "Faire les courses", "Aller chez le coiffeur"],
	// 	"done": ["Acheter 1234 place de musée", "Faire le ménage", "Faire ton appli Sapper"]
	// }
	//
	console.log(tasks)
	if (tasks !== null) {
			const list = tasks['_items'].reduce((acc, task)=> {
					acc[task.status] = (acc[task.status] || []).concat([task.name])
					return acc
			}, {})
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(list));
	} else {
		next();
	}
}


export async function post(req, res, next) {
	console.log("req.body", req.body)
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Accept', 'application/json');

	const config = {
		method: 'POST',
		body: JSON.stringify({"name": req.body.name, "status": "Todo"}),
		headers: {
			'Content-Type': 'application/json'
		}
	}
	const res_db = await fetch(base_url, config)

	const resp = await res_db.json()
	console.log('resp1', resp)

	if (resp !== null) {
			res.end(JSON.stringify(resp));
	} else {
		next();
	}
}
