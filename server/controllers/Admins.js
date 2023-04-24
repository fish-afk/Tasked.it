const Model = require("../models/Mysql_conn");
const authMiddleware = require("../middleware/AuthToken");
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

// async function to login a user
async function login(req, res) {
    const { username, password } = req.body;

    console.log(username)

	Model.connection.query(
		"SELECT * FROM Admins WHERE username = ?",
		[username],
		(err, results) => {
			if (err) res.send({status: 'FAILURE', message: "Unknown error"});

			// check if user with the given username exists in the database
            if (results?.length === 0) {
                return res.send({ status: 'FAILURE', message: "Invalid username or password" });
            } else {
                // verify hashed password
                const hashedPassword = results[0].password;
                bcrypt.compare(password, hashedPassword, (err, match) => {
                    if (err) res.send({ status: 'FAILURE', message: "Unknown error" });
                    if (!match) {
                        return res.send({
                            status: "FAILURE",
                            message: "Invalid username or password",
                        });
                    }
                    
                    // create a refresh token and an access token
                    const refreshToken = authMiddleware.generateRefreshToken(username, "Admin");
                    const accessToken = authMiddleware.createJWTtoken(username, "Admin");

                    return res.send({
                        "refreshToken": refreshToken,
                        "accessToken": accessToken
                    })
                });
            }
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


async function registerAdmin(req, res) {

    const { username, password, email, fullname, employee_title = "staff", admin_key } = req.body;
    
    if (admin_key !== process.env.ADMIN_KEY) {
        return res.send({status: 'FAILURE', message: 'Not authorised'})
    }

	// hash the password
	bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword) => {
		if (err) throw err;

		const admin = { username, password: hashedPassword, email, fullname, employee_title };

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
							if (err) {
								console.log(err)
								return res.send({
									status: "FAILURE",
									message: "Unknown error",
								});
							} else {
								return res.send({
									status: "SUCCESS",
									message: `Admin with username ${username} added to database.`,
								});
							}
							
						},
					);
				}
			},
		);
	});
}

async function updateAdmin(req, res) {
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


async function getAllAdmins(req, res) {
	Model.connection.query("SELECT * FROM Admins", (err, result) => {
		if (err)
			res.status(500).send({ status: "FAILURE", message: "Unknown error" });
		res.send({ status: "SUCCESS", data: result });
	});
}

async function getAdminByUsername(req, res) {
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


async function deleteAdmin(req, res) {
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