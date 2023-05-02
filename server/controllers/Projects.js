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

	const { id, name, duration_in_days, total_funding, Admin } = req.body;

	if (!id || !name || !duration_in_days || !total_funding || !Admin) {
		return res.send({
			status: "FAILURE",
			message: "Missing details",
		});
	} else {
		const query = "SELECT * FROM Admins WHERE username = ?";

		Model.connection.query(query, [Admin], (err, results) => {
			if (err) {
				console.log(err);
				return res.send({ status: "FAILURE", message: "Unknown error" });
			} else if (results?.length < 1) {
				return res.send({ status: "FAILURE", message: "Admin does not exist" });
			} else {
				const update = { name, duration_in_days, total_funding, Admin };

				const query = "UPDATE Projects SET ? WHERE id = ?";

				Model.connection.query(query, [update, id], (err, results) => {
					if (err) {
						console.log(err);
						return res.send({ status: "FAILURE", message: "Unknown error" });
					} else {
						return res.send({
							status: "SUCCESS",
							message: "Updated successfully",
						});
					}
				});
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

	const { name, duration_in_days, total_funding, client } =
		req.body;
	
	const Admin = req.decoded['username'];

	const new_ = { name, duration_in_days, total_funding, client, Admin };

	if (
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
	}

	if (tasks?.length) {
		return res.send({
			status: "FAILURE",
			message: "Atleast 1 task needed on project creation",
		});
	}

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
};

const delete_project = (req, res) => {
	if (req.decoded.privs != "Admin") {
		return res.send({
			status: "FAILURE",
			message: "Insufficient privileges",
		});
	} else {
		const { id } = req.body;

		if (!id) {
			return res.send({ status: "FAILURE", message: "Missing details" });
		} else {
			const query = "DELETE FROM Projects WHERE id = ?";

			Model.connection.query(query, [id], (err, results) => {
				if (err) {
					console.log(err);
					return res.send({ status: "FAILURE", message: "Unknown error" });
				} else {
					return res.send({
						status: "SUCCESS",
						message: "Deleted project successfully",
					});
				}
			});
		}
	}
};

module.exports = {
	get_all_projects,
	edit_project,
	new_project,
	delete_project,
};
