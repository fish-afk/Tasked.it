const Model = require("../models/Mysql_conn");
const authMiddleware = require("../middleware/AuthToken");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

// async function to login a user
async function login(req, res) {
	const { username, password } = req.body;
	Model.connection.query(
		"SELECT * FROM Freelancers WHERE username = ?",
		[username],
		(err, results) => {
			if (err) res.send({ status: "FAILURE", message: "Unknown error" });

			// check if user with the given username exists in the database
			if (results?.length === 0) {
				return res.send({
					status: "FAILURE",
					message: "Invalid username or password",
				});
			} else {
				// verify hashed password
				const hashedPassword = results[0]?.password;
				bcrypt.compare(password, hashedPassword, (err, match) => {
					if (err) res.send({ status: "FAILURE", message: "Unknown error" });
					if (!match) {
						return res.send({
							status: "FAILURE",
							message: "Invalid username or password2",
						});
					}

					// create a refresh token and an access token
					const refreshToken = authMiddleware.generateRefreshToken(
						username,
						"Freelancer",
					);
					const accessToken = authMiddleware.createJWTtoken(
						username,
						"Freelancer",
					);

					return res.send({
						refreshToken: refreshToken,
						accessToken: accessToken,
					});
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

function registerFreelancer(req, res) {
	if (req.decoded.privs != "Admin") {
		return res.send({ status: "FAILURE", message: "Insufficient privileges" });
	}

	const { username, password, email, fullname, roles, age } = req.body;

	if (roles?.length < 1) {
		return res.send({
			status: "FAILURE",
			message: "Need atleast 1 role to be set",
		});
	}

	// hash the password
	bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword) => {
		if (err) {
			console.log(err);
			return res.status(500).send({
				status: "FAILURE",
				message: "Unknown error",
			});
		}

		const Freelancer = {
			username,
			password: hashedPassword,
			email,
			fullname,
			age,
		};

		// check if username exists
		Model.connection.query(
			"SELECT * FROM Freelancers WHERE username = ?",
			username,
			(err, result) => {
				if (err) {
					console.log(err);
					return res.status(500).send({
						status: "FAILURE",
						message: "Unknown error",
					});
				}

				if (result.length !== 0) {
					return res.status(400).send({
						status: "FAILURE",
						message: `Username ${username} already exists.`,
					});
				}

				// insert the new Freelancer
				Model.connection.query(
					"INSERT INTO Freelancers SET ?",
					Freelancer,
					(err, result) => {
						if (err) {
							console.log(err);
							return res.status(500).send({
								status: "FAILURE",
								message: "Unknown error",
							});
						}
						let count = 0;
						// set roles
						for (let i = 0; i < roles?.length; i++) {
							let set = {
								freelancer: username,
								role: roles[i]?.id,
							};

							Model.connection.query(
								"INSERT INTO freelancerRoles SET ?",
								set,
								(err, ress) => {
									if (err) {
										console.log(err);
										return res.status(500).send({
											status: "FAILURE",
											message: "Error setting roles.",
										});
									}

									count++;

									if (count === roles.length) {
										return res.send({
											status: "SUCCESS",
											message: "Registered successfully",
										});
									}
								},
							);
						}
					},
				);
			},
		);
	});
}

async function updateFreelancer(req, res) {
	const { username, email, fullname, roles, age } = req.body;
	const Freelancer = { email, fullname, age };

	// check if username exists
	Model.connection.query(
		"SELECT * FROM Freelancers WHERE username = ?",
		username,
		(err, result) => {
			if (err)
				res.status(500).send({ status: "FAILURE", message: "Unknown error" });
			if (result.length === 0) {
				res.status(404).send({
					status: "FAILURE",
					message: `Freelancer with username ${username} not found.`,
				});
			} else {
				// update the Freelancer
				Model.connection.query(
					"UPDATE Freelancers SET ? WHERE username = ?",
					[Freelancer, username],
					(err, result) => {
						if (err) {
							res.status(500).send({
								status: "FAILURE",
								message: "Unknown error",
							});
						} else {
							if (roles?.length > 1) {
								let count = 0;
								for (let i = 0; i < roles?.length; i++) {
									let set = {
										freelancer: username,
										role: roles[i]?.id,
									};

									Model.connection.query(
										"INSERT INTO freelancerRoles SET ?",
										set,
										(err, ress) => {
											if (err) {
												console.log(err);
												return res.status(500).send({
													status: "FAILURE",
													message: "Error setting roles.",
												});
											}

											count++;

											if (count === roles.length) {
												return res.send({
													status: "SUCCESS",
													message: "Updated successfully",
												});
											}
										},
									);
								}
							} else {
								return res.send({
									status: "SUCCESS",
									message: "Updated successfully",
								});
							}
						}
					},
				);
			}
		},
	);
}

async function getAllFreelancers(req, res) {
	if (req.decoded.privs != "Admin") {
		return res.send({ status: "FAILURE", message: "Insufficient privileges" });
	} else {
		Model.connection.query(
			"SELECT username, fullname, email, age FROM Freelancers",
			(err, result) => {
				if (err)
					res.status(500).send({ status: "FAILURE", message: "Unknown error" });
				res.send({ status: "SUCCESS", data: result });
			},
		);
	}
}

async function getFreelancerByUsername(req, res) {
	const username = req.params.username;

	Model.connection.query(
		"SELECT * FROM Freelancers WHERE username = ?",
		username,
		(err, result) => {
			if (err)
				res.status(500).send({ status: "FAILURE", message: "Unknown error" });
			if (result.length === 0) {
				res
					.status(404)
					.send({ status: "FAILURE", message: "Freelancer not found." });
			} else {
				res.send({ status: "SUCCESS", data: result[0] });
			}
		},
	);
}

async function deleteFreelancer(req, res) {
	let username =
		req.decoded["privs"] == "Admin"
			? req.body.username
			: req.decoded["username"];

	Model.connection.query(
		"DELETE FROM Freelancers WHERE username = ?",
		[username],
		(err, result) => {
			if (err)
				res.status(500).send({ status: "FAILURE", message: "Unknown error" });
			if (result.affectedRows === 0) {
				res
					.status(404)
					.send({ status: "FAILURE", message: "Freelancer not found." });
			} else {
				res.send({
					status: "SUCCESS",
					message: `Freelancer with username ${username} deleted successfully.`,
				});
			}
		},
	);
}

async function change_password(req, res) {
	const username = req.decoded["username"];

	if (username == undefined) {
		return res.send({ status: "FAILURE", message: "Missing details" });
	} else {
		const { oldPassword, newPassword } = req.body;

		// get the hashed password from the database
		Model.connection.query(
			"SELECT * FROM Freelancers WHERE username = ?",
			[username],
			async (err, results) => {
				if (err) {
					return res.send({ status: "FAILURE", message: "Unknown error" });
				}

				const hashedPassword = results[0]?.password;

				// verify the old password
				const match = await bcrypt.compare(oldPassword, hashedPassword);
				if (!match) {
					return res.send({
						status: "FAILURE",
						message: "Invalid old password",
					});
				}

				// hash the new password
				const newHashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

				// update the password in the database
				Model.connection.query(
					"UPDATE Freelancers SET password = ? WHERE username = ?",
					[newHashedPassword, username],
					(err, result) => {
						if (err) {
							console.log(err);
							return res.send({ status: "FAILURE", message: "Unknown error" });
						} else {
							return res.send({
								status: "SUCCESS",
								message: "Password updated successfully",
							});
						}
					},
				);
			},
		);
	}
}

async function get_my_roles(req, res) {
	const username = req.decoded.username;

	Model.connection.query(
		"SELECT * FROM freelancerroles WHERE freelancer = ?",
		[username],
		(err, result) => {
			if (err) {
				res.status(500).send({ status: "FAILURE", message: "Unknown error" });
			} else {
				res.send({ status: "SUCCESS", data: result });
			}
		},
	);
}


async function get_numbers(req, res) {
	

	const username = req.decoded["username"];
	let queries = [
		"SELECT COUNT(*) as done FROM Tasks WHERE Freelancer_id = ? AND completed = 1",
		"SELECT COUNT(*) as remaining FROM Tasks WHERE Freelancer_id = ? AND completed = 0",
	];

	let promises = queries.map((query) => {
		return new Promise((resolve, reject) => {
			Model.connection.query(query, [username], (err, results) => {
				if (err) {
					reject(err);
				} else {
					resolve(results[0]);
				}
			});
		});
	});

	try {
		let [doneResult, remainingResult] = await Promise.all(promises);
		let finalResult = {
			done: doneResult.done || 0,
			remaining: remainingResult.remaining || 0,
		};

		return res.send({ status: "SUCCESS", result: finalResult });
	} catch (err) {
		return res.send({ status: "ERROR", message: "An error occurred" });
	}

}

module.exports = {
	registerFreelancer,
	getAllFreelancers,
	getFreelancerByUsername,
	updateFreelancer,
	deleteFreelancer,
	change_password,
	login,
	refresh,
	get_my_roles,
	get_numbers
};
