const Model = require("../models/Mysql_conn");
const authMiddleware = require("../middleware/AuthToken");
const bcrypt = require("bcrypt");

async function get_total_tasks_due_today(req, res) {
	if (req.decoded.privs != "Admin") {
		return res.send("Insufficient privileges");
	} else {
		let query = "SELECT COUNT(*) FROM TASKS WHERE DATE(`due_date`) = CURDATE()";

		Model.connection.query(query, [], (err, results) => {
			if (results && !err) {
				return res.send({ status: "SUCCESS", result: results });
			} else {
				return res.send({ status: "ERROR", message: "An error occurred" });
			}
		});
	}
}

async function check_ids_exist(freelancer_id, project_id) {
	// Check if the freelancer ID exists
	let freelancer_query =
		"SELECT COUNT(*) AS count FROM Freelancers WHERE username = ?";
	let freelancer_results = await Model.connection
		.promise()
		.query(freelancer_query, [freelancer_id]);
	

	if (freelancer_results[0][0].count == 0) {
		return false;
	}

	// Check if the project ID exists
	let project_query = "SELECT COUNT(*) AS count FROM Projects WHERE id = ?";
	let project_results = await Model.connection
		.promise()
		.query(project_query, [project_id]);

	if (project_results[0][0].count == 0) {
		return false;
	}

	// Both IDs exist, return true
	return true;
}


// CREATE task
async function create_task(req, res) {
	if (req.decoded.privs !== "Admin") {
		return res.send("Insufficient privileges");
	} else {
		const { name, description, Freelancer_id, due_date, project_id, price_allocation } = req.body;
		if (!name || !description || !due_date || !price_allocation) {
			return res.send({ status: "FAILURE", message: "Missing required details" });
		}

		if (await check_ids_exist(Freelancer_id, project_id) == false) {

			return res.send({status: "FAILURE", message: 'Freelancer username or project id invalid'})
		}

		
		let query = "INSERT INTO Tasks (name, description, Freelancer_id, due_date, project_id, price_allocation) VALUES (?, ?, ?, ?, ?, ?)";

		Model.connection.query(query, [name, description, Freelancer_id, due_date, project_id, price_allocation], (err, results) => {
			if (!err) {
				return res.send({ status: "SUCCESS", message: "Task created successfully" });
			} else {
				console.log(err);
				return res.send({ status: "ERROR", message: "An error occurred" });
			}
		});
	}
}



async function update_task(req, res) {
	// Check if the user has sufficient privileges
	if (req.decoded.privs !== "Admin") {
		return res
			.status(403)
			.send({ status: "FAILURE", message: "Insufficient privileges" });
	}

	// Get the task ID from the request parameters
	const { task_id } = req.body;

	// Check if the task ID is valid
	if (!task_id) {
		return res
			.status(400)
			.send({ status: "FAILURE", message: "Missing task ID" });
	}

	// Get the updated task data from the request body
	const {
		name,
		description,
		Freelancer_id,
		due_date,
		project_id,
		price_allocation,
		completed,
	} = req.body;

	if (await check_ids_exist(Freelancer_id, project_id) == false) {
		return res.send({
			status: "FAILURE",
			message: "Freelancer username or project id invalid",
		});
	}

	// Construct the update query
	let query = "UPDATE Tasks SET";
	let updates = [];

	if (name !== undefined) updates.push(`name = '${name}'`);
	if (description !== undefined) updates.push(`description = '${description}'`);
	if (Freelancer_id !== undefined)
		updates.push(`Freelancer_id = '${Freelancer_id}'`);
	if (due_date !== undefined) updates.push(`due_date = '${due_date}'`);
	if (project_id !== undefined) updates.push(`project_id = '${project_id}'`);
	if (price_allocation !== undefined)
		updates.push(`price_allocation = '${price_allocation}'`);
	if (completed !== undefined) updates.push(`completed = '${completed}'`);

	if (updates.length === 0) {
		return res
			.status(400)
			.send({ status: "FAILURE", message: "No update data provided" });
	}

	query += " " + updates.join(", ");
	query += ` WHERE id = ${task_id}`;

	// Execute the update query
	Model.connection.query(query, [], (err, results) => {
		if (!err) {
			return res.send({
				status: "SUCCESS",
				message: "Task updated successfully",
			});
		} else {
			console.log(err);
			return res
				.status(500)
				.send({ status: "ERROR", message: "An error occurred" });
		}
	});
}


async function get_tasks_for_project(req, res) {
	if (req.decoded.privs != "Admin") {
		return res.send("Insufficient privileges");
	} else {
		const { project_id } = req.body;

		if (project_id == undefined) {
			return res.send({ status: "FAILURE", message: "Missing details" });
		}

		let query = "SELECT * FROM TASKS WHERE project_id = ?";

		Model.connection.query(query, [project_id], (err, results) => {
			if (results && !err) {
				return res.send({ status: "SUCCESS", data: results });
			} else {
				return res.send({ status: "ERROR", message: "An error occurred" });
			}
		});
	}
}

async function get_all_tasks(req, res) {
	if (req.decoded.privs != "Admin") {
		return res.send("Insufficient privileges");
	} else {
		let query = "SELECT * FROM TASKS";
		Model.connection.query(query, (err, results) => {
			if (results && !err) {
				return res.send({ status: "SUCCESS", data: results });
			} else {
				console.log(err);
				return res.send({ status: "ERROR", message: "An error occurred" });
			}
		});
	}
}

module.exports = {
	get_total_tasks_due_today,
	get_tasks_for_project,
	get_all_tasks,
	create_task,
	update_task
};
