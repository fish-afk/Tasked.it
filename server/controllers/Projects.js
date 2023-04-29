const Model = require("../models/Mysql_conn");
const MongoDB = require("../models/mongo_db");

const get_all_projects = async (req, res) => {
	if (req.decoded.privs != "Admin") {
		return res.send({ status: "FAILURE", message: "Insufficient privileges" });
	} else {
		const query = "SELECT * FROM Projects";

		Model.connection.query(query, (err, results) => {
			if (err) {
				console.log(err);
				return res.send({ status: "FAILURE", message: "Unknown error" });
			} else {
				return res.send({ status: "SUCCESS", data: results });
			}
		});
	}
};

const edit_project = async (req, res) => {
	if (req.decoded.privs != "Admin") {
		return res.send({
			status: "FAILURE",
			message: "Insufficient privileges",
		});
	}

	const { id, name, duration_in_days, total_funding, client, Admin } = req.body;

	const update = { name, duration_in_days, total_funding, client, Admin };

	if (
		!id ||
		!name ||
		!duration_in_days ||
		!total_funding ||
		!client ||
		!Admin
	) {
		return res.send({
			status: "FAILURE",
			message: "Missing details",
		});
	} else {
		const query = "UPDATE Projects SET ? WHERE id = ?";

		Model.connection.query(query, [update, id], (err, results) => {
			if (err) {
				console.log(err);
				return res.send({ status: "FAILURE", message: "Unknown error" });
			} else {
				return res.send({ status: "SUCCESS", message: "Updated successfully" });
			}
		});
	}
};

const new_project = (req, res) => {
	if (req.decoded.privs != "Admin") {
		return res.send({
			status: "FAILURE",
			message: "Insufficient privileges",
		});
	}

	const { name, duration_in_days, total_funding, client, Admin } = req.body;

	const new_ = { name, duration_in_days, total_funding, client, Admin };

	if (!name || !duration_in_days || !total_funding || !client || !Admin) {
		return res.send({
			status: "FAILURE",
			message: "Missing details",
		});
	} else {
		const query = "INSERT INTO Projects SET ?";

		Model.connection.query(query, [new_], (err, results) => {
			if (err) {
				console.log(err);
				return res.send({ status: "FAILURE", message: "Unknown error" });
			} else {
				return res.send({
					status: "SUCCESS",
					message: "Created new project successfully",
				});
			}
		});
	}
};

module.exports = {
	get_all_projects,
	edit_project,
	new_project,
};
