// routes/[tasks].json.js
export async function get(req, res, next) {
	console.log('coucou')
	let tasks = {
		"todo": ["Sortir les poubelles", "Faire les courses", "Aller chez le coiffeur"],
		"done": ["Acheter 1234 place de musée", "Faire le ménage", "Faire ton appli Sapper"]
	}
	if (tasks !== null) {
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(tasks));
	} else {
		next();
	}
}
