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

async function get_tasks_for_project(req, res) {
	if (req.decoded.privs != "Admin") {
		return res.send("Insufficient privileges");
	} else {
		const { project_id } = req.body;

		if (project_id == undefined) {
			return res.send({ status: 'FAILURE', message: 'Missing details' });
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



module.exports = {get_total_tasks_due_today, get_tasks_for_project}