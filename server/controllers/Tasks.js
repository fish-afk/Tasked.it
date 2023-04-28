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


module.exports = {get_total_tasks_due_today}