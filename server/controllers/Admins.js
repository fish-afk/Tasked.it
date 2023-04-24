const Model = require("../models/Mysql_conn");
const authMiddleware = require("../middleware/AuthToken");
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

// function to login a user
function login(req, res) {
	const { username, password } = req;
	connection.query(
		"SELECT * FROM Admins WHERE username = ?",
		username,
		(err, results) => {
			if (err) res.send({status: 'FAILURE', message: "Unknown error"});

			// check if user with the given username exists in the database
			if (results.length === 0) {
				return res.send("Invalid username or password");
			}

			// verify hashed password
			const hashedPassword = results[0].password;
			bcrypt.compare(password, hashedPassword, (err, match) => {
				if (err) res.send({status: 'FAILURE', message: "Unknown error"});
				if (!match) {
					return res.send("Invalid username or password");
				}

				// create a refresh token and an access token
				const refreshToken = authMiddleware.generateRefreshToken(username, "Admin");
                const accessToken = authMiddleware.createJWTtoken(username, "Admin");

                return res.send({
                    "refreshtoken": refreshToken,
                    "accesstoken": accessToken
                })
			});
		},
	);
}

const refresh = async (req, res) => {
	const refreshToken = req.body.refreshToken;
	const username = req.body.username;

	if (!refreshToken || refreshToken == undefined) {
		return res.send({ message: "No Token Provided!" });
	}
	await authMiddleware.verifyRefreshToken(refreshToken, username, res);
};


function registerAdmin(req, res) {
	const { username, password, email, fullname } = req.body;

	// hash the password
	bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword) => {
		if (err) throw err;

		const admin = { username, password: hashedPassword, email, fullname };

		// check if username exists
		Model.connection.query(
			"SELECT * FROM Admins WHERE username = ?",
			username,
			(err, result) => {
				if (err)
					res.status(500).send({ status: "FAILURE", message: "Unknown error" });
				if (result.length !== 0) {
					res.status(400).send({
						status: "FAILURE",
						message: `Username ${username} already exists.`,
					});
				} else {
					// insert the new admin
					Model.connection.query(
						"INSERT INTO Admins SET ?",
						admin,
						(err, result) => {
							if (err)
								res.status(500).send({
									status: "FAILURE",
									message: "Unknown error",
								});
							res.send({
								status: "SUCCESS",
								message: `Admin with username ${username} added to database.`,
							});
						},
					);
				}
			},
		);
	});
}

function updateAdmin(req, res) {
	const { username, password, email, fullname } = req.body;
	const admin = { password, email, fullname };

	// check if username exists
	Model.connection.query(
		"SELECT * FROM Admins WHERE username = ?",
		username,
		(err, result) => {
			if (err)
				res.status(500).send({ status: "FAILURE", message: "Unknown error" });
			if (result.length === 0) {
				res.status(404).send({
					status: "FAILURE",
					message: `Admin with username ${username} not found.`,
				});
			} else {
				// update the admin
				Model.connection.query(
					"UPDATE Admins SET ? WHERE username = ?",
					[admin, username],
					(err, result) => {
						if (err)
							res.status(500).send({
								status: "FAILURE",
								message: "Unknown error",
							});
						res.send({
							status: "SUCCESS",
							message: `Admin with username ${username} updated.`,
						});
					},
				);
			}
		},
	);
}


function getAllAdmins(req, res) {
	Model.connection.query("SELECT * FROM Admins", (err, result) => {
		if (err)
			res.status(500).send({ status: "FAILURE", message: "Unknown error" });
		res.send({ status: "SUCCESS", data: result });
	});
}

function getAdminByUsername(req, res) {
	const username = req.params.username;

	Model.connection.query(
		"SELECT * FROM Admins WHERE username = ?",
		username,
		(err, result) => {
			if (err)
				res.status(500).send({ status: "FAILURE", message: "Unknown error" });
			if (result.length === 0) {
				res
					.status(404)
					.send({ status: "FAILURE", message: "Admin not found." });
			} else {
				res.send({ status: "SUCCESS", data: result[0] });
			}
		},
	);
}


function deleteAdmin(req, res) {
	const username = req.params.username;

	Model.connection.query(
		"DELETE FROM Admins WHERE username = ?",
		username,
		(err, result) => {
			if (err)
				res.status(500).send({ status: "FAILURE", message: "Unknown error" });
			if (result.affectedRows === 0) {
				res
					.status(404)
					.send({ status: "FAILURE", message: "Admin not found." });
			} else {
				res.send({
					status: "SUCCESS",
					message: `Admin with username ${username} deleted from database.`,
				});
			}
		},
	);
}

module.exports = {
	registerAdmin,
	getAllAdmins,
	getAdminByUsername,
	updateAdmin,
    deleteAdmin,
    login,
    refresh
};