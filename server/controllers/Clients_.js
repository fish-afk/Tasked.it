const Model = require("../models/Mysql_conn");

// Create a new client
async function createClient(req, res) {
	const { name, description, email } = req.body;

	const client = { name, description, email };

	if (req.decoded.privs !== "Admin") {
		return res.send({
			status: "FAILURE",
			message: "Insufficient privileges",
		});
	} else {
		
		const check = "SELECT * FROM Clients WHERE name = ?";

		Model.connection.query(check, [name], (err, results) => {
			if (err) {
				console.log(err);
				res.status(500).send({ status: "FAILURE", message: "Unknown error" });
			} else {

				if (results?.length > 0) {
					res.status(500).send({ status: "FAILURE", message: "Client with this name exists" });
				}

				const query = "INSERT INTO Clients SET ?";
				Model.connection.query(query, [client], (err, result) => {
					if (err) {
						console.log(err);
						res.status(500).send({ status: "FAILURE", message: "Unknown error" });
					} else {
				
						return res.send({
							status: "SUCCESS",
							message: "Client added successfully",
						});
					}
				});
			}
		});
	} // <-- Added closing parenthesis here
}


// Get all clients
async function getAllClients(req, res) {
	if (req.decoded.privs !== "Admin") {
		return res.send({
			status: "FAILURE",
			message: "Insufficient privileges",
		});
	} else {
		const query = "SELECT * FROM Clients";

		Model.connection.query(query, (err, results) => {
			if (!err && results) {
				return res.send({ status: "SUCCESS", data: results });
			} else {
				console.log(err);
				return res.send({ status: "FAILURE", message: "Unknown error" });
			}
		});
	}
}

// Get a single client by name
async function getClientByName(req, res) {
	const { name } = req.body;

	const query = "SELECT * FROM Clients WHERE name = ?";

	Model.connection.query(query, [name], (err, results) => {
		if (!err && results.length > 0) {
			return res.send({ status: "SUCCESS", data: results[0] });
		} else {
			console.log(err);
			return res.send({
				status: "FAILURE",
				message: "Client with this name does not exist",
			});
		}
	});
}

// Update a client by name
async function updateClientByName(req, res) {
	const { name } = req.body;
	const { description, email } = req.body;

	const client = { description, email };

	if (req.decoded.privs !== "Admin") {
		return res.send({
			status: "FAILURE",
			message: "Insufficient privileges",
		});
	} else {
		const query = "UPDATE Clients SET ? WHERE name = ?";

		Model.connection.query(query, [client, name], (err, result) => {
			if (err) {
				console.log(err);
				res.status(500).send({ status: "FAILURE", message: "Unknown error" });
			} else {
				if (result.affectedRows === 0) {
					res
						.status(404)
						.send({ status: "FAILURE", message: "Client not found." });
				} else {
					res.send({
						status: "SUCCESS",
						message: `Client with name ${name} updated successfully.`,
					});
				}
			}
		});
	}
}

// Delete a client by name
async function deleteClientByName(req, res) {
	const { name } = req.body;

	if (req.decoded.privs !== "Admin") {
		return res.send({
			status: "FAILURE",
			message: "Insufficient privileges",
		});
	} else {
		const query = "DELETE FROM Clients WHERE name = ?";

		Model.connection.query(query, [name], (err, results) => {
			if (err) {
				console.log(err);
				res.status(500).send({ status: "FAILURE", message: "Unknown error" });
			}
			if (results.affectedRows === 0) {
				res
					.status(404)
					.send({ status: "FAILURE", message: "Client not found." });
			} else {
				res.send({
					status: "SUCCESS",
					message: `Client with name ${name} deleted successfully.`,
				});
			}
		});
	}
}


module.exports = {
    createClient,
    updateClientByName,
    deleteClientByName,
    getAllClients,
    getClientByName
}