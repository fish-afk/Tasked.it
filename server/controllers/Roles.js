const Model = require("../models/Mysql_conn");
const MongoDB = require("../models/mongo_db");
const authMiddleware = require("../middleware/AuthToken");
const bcrypt = require("bcrypt");

function get_all_roles(req, res) {
	if (req.decoded.privs !== "Admin") {
		return res.send({ status: "FAILURE", message: "Insufficient privileges" });
	} else {
		const query = "SELECT * FROM Roles";

		Model.connection.query(query, (err, results) => {
			if (!err && results) {
				return res.send({ status: "SUCCESS", data: results });
			} else {
				console.log(err);
				return res.send({ status: "FAILURE", message: "Uknown error" });
			}
		});
	}
}

async function deleteRole(req, res) {
	let role_id = req.body["id"];

	if (req.decoded.privs !== "Admin") {
		return res.send({
			status: "FAILURE",
			message: "Insufficient privileges",
		});
	} else {
		Model.connection.query(
			"DELETE FROM Roles WHERE id = ?",
			[role_id],
			(err, result) => {
				if (err)
					res.status(500).send({ status: "FAILURE", message: "Unknown error" });
				if (result.affectedRows === 0) {
					res
						.status(404)
						.send({ status: "FAILURE", message: "Role not found." });
				} else {
					res.send({
						status: "SUCCESS",
						message: `Role with id ${role_id} deleted successfully.`,
					});
				}
			},
		);
	}
}

async function editrole(req, res) {
	const { id, name, description } = req.body;

	const role = { id, name, description };

	if (req.decoded.privs !== "Admin") {
		return res.send({
			status: "FAILURE",
			message: "Insufficient privileges",
		});
	} else {
		const query = "SELECT * FROM Roles WHERE id = ?";

		Model.connection.query(query, [id], (err, results) => {
			if (err) {
				console.log(err);
				res.status(500).send({ status: "FAILURE", message: "Unknown error" });
			} else {
				if (results.length < 1) {
					return res.send({
						status: "FAILURE",
						message: "Role with this id does not exist",
					});
				} else {
					const query = "UPDATE Roles SET ? WHERE id = ?";

					Model.connection.query(query, [role, id], (err, result) => {
						if (err) {
							console.log(err);
							res
								.status(500)
								.send({ status: "FAILURE", message: "Unknown error" });
						} else {
							return res.send({
								status: "SUCCESS",
								message: "Updated role successfully",
							});
						}
					});
				}
			}
		});
	}
}

async function addrole(req, res) { 

    const { name, description } = req.body;

	const role = {  name, description };

    if (req.decoded.privs !== "Admin") {
        return res.send({
            status: "FAILURE",
            message: "Insufficient privileges",
        });
    } else { 

        const query = "INSERT INTO Roles SET ?";

				Model.connection.query(query, [role], (err, result) => {
					if (err) {
						console.log(err);
						res
							.status(500)
							.send({ status: "FAILURE", message: "Unknown error" });
					} else {
						return res.send({
							status: "SUCCESS",
							message: "Added role successfully",
						});
					}
				});
    }

}



module.exports = {
	get_all_roles,
    deleteRole,
    editrole,
    addrole
};
