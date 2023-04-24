const Model = require("../models/Mysql_conn");
const authMiddleware = require("../middleware/AuthToken");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

// async function to login a user
async function login(req, res) {
	const { username, password } = req;
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
                const hashedPassword = results[0].password;
                bcrypt.compare(password, hashedPassword, (err, match) => {
                    if (err) res.send({ status: "FAILURE", message: "Unknown error" });
                    if (!match) {
                        return res.send({
                            status: "FAILURE",
                            message: "Invalid username or password",
                        });
                    }

                    // create a refresh token and an access token
                    const refreshToken = authMiddleware.generateRefreshToken(
                        username,
                        "Freelancer",
                    );
                    const accessToken = authMiddleware.createJWTtoken(username, "Freelancer");

                    return res.send({
                        refreshtoken: refreshToken,
                        accesstoken: accessToken,
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

async function registerFreelancer(req, res) {
	const { username, password, email, fullname } = req.body;

	// hash the password
	bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword) => {
		if (err) throw err;

		const Freelancer = { username, password: hashedPassword, email, fullname };

		// check if username exists
		Model.connection.query(
			"SELECT * FROM Freelancers WHERE username = ?",
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
					// insert the new Freelancer
					Model.connection.query(
						"INSERT INTO Freelancers SET ?",
						Freelancer,
						(err, result) => {
							if (err)
								res.status(500).send({
									status: "FAILURE",
									message: "Unknown error",
								});
							res.send({
								status: "SUCCESS",
								message: `Freelancer with username ${username} added to database.`,
							});
						},
					);
				}
			},
		);
	});
}

async function updateFreelancer(req, res) {
	const { username, password, email, fullname } = req.body;
	const Freelancer = { password, email, fullname };

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
						if (err)
							res.status(500).send({
								status: "FAILURE",
								message: "Unknown error",
							});
						res.send({
							status: "SUCCESS",
							message: `Freelancer with username ${username} updated.`,
						});
					},
				);
			}
		},
	);
}

async function getAllFreelancers(req, res) {
	Model.connection.query("SELECT * FROM Freelancers", (err, result) => {
		if (err)
			res.status(500).send({ status: "FAILURE", message: "Unknown error" });
		res.send({ status: "SUCCESS", data: result });
	});
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
	const username = req.params.username;

	Model.connection.query(
		"DELETE FROM Freelancers WHERE username = ?",
		username,
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
					message: `Freelancer with username ${username} deleted from database.`,
				});
			}
		},
	);
}

module.exports = {
	registerFreelancer,
	getAllFreelancers,
	getFreelancerByUsername,
	updateFreelancer,
	deleteFreelancer,
	login,
	refresh,
};
