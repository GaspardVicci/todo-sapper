// routes/tasks.json.js
const fetch = require('node-fetch');
let base_url = 'http://services:5000/tasks'

export async function get(req, res, next) {

	var url = base_url + '?' + encodeURIComponent('where={"status":"in("(\'Todo\',\'Done\’)")"}')
	const res_tasks = await fetch(url)
	let tasks = await res_tasks.json()

	if (tasks !== null) {
			const list = tasks['_items'].reduce((acc, task)=> {
					acc[task.status] = (acc[task.status] || []).concat([task])
					return acc
			}, {})
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(list));
	} else {
		next();
	}
}


