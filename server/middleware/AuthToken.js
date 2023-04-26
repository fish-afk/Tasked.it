/**
 * This is a module that contains functions for creating, verifying, and refreshing JSON Web Tokens
 * (JWTs) for both freelancers and admins.
 * @param username - The username of the user for whom the JWT token is being created or verified.
 * @param [privs=Freelancer] - privs is short for "privileges" and refers to the level of access or
 * permissions that a user has within the system. In this code, it is used to determine whether the
 * user is an Admin or a Freelancer, and to set the expiration time for the JWT accordingly.
 * @returns An object containing several functions related to JWT authentication and refresh tokens.
 * These functions include creating a JWT token, generating a refresh token, verifying a refresh token,
 * verifying a JWT token, and confirming the validity of a JWT token.
 */

const jwt = require("jsonwebtoken");
const mongo_db = require("../models/mongo_db");

const FREELANCER_JWT_SECRET = process.env.FREELANCER_JWT_SECRET;
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

const createJWTtoken = (username, privs = "Freelancer") => {
	const date = new Date();
	const JWT_EXPIRATION_TIME =
		privs == "Admin"
			? Math.floor(date.getTime() / 1000) + 60 * 10 // 10 minutes from now if Admin
			: Math.floor(date.getTime() / 1000) + 60 * 20; // 20 minutes from now if Freelancer

	return jwt.sign(
		{ username, exp: JWT_EXPIRATION_TIME, privs: privs },
		privs == "Admin" ? ADMIN_JWT_SECRET : FREELANCER_JWT_SECRET,
	);
};

function generateRefreshToken(username, privs = "Freelancer") {
	const date = new Date();
	const REFRESH_EXPIRATION_TIME = date.setMonth(date.getMonth() + 1); // 1 month from now

	const refreshToken = jwt.sign(
		{ username, exp: REFRESH_EXPIRATION_TIME, privs: privs },
		REFRESH_SECRET,
	);

	if (privs == "Freelancer") {
		mongo_db.FreelancerRefreshToken.deleteMany(
			{ userId: username },
			function (err, result) {
				if (!err) {
					console.log(
						`cleared previous refresh token for ${privs}: '${username}'`,
					);
				}
			},
		);

		mongo_db.FreelancerRefreshToken.create(
			{
				token: refreshToken,
				userId: username,
				expires: REFRESH_EXPIRATION_TIME,
			},
			(err, doc) => {
				if (err || !doc) {
					return false;
				}
			},
		);
		return refreshToken;
	}

	if (privs == "Admin") {
		mongo_db.AdminRefreshToken.deleteMany(
			{ userId: username },
			function (err, result) {
				if (!err) {
					console.log(
						`cleared previous refresh token for ${privs}: '${username}'`,
					);
				}
			},
		);

		mongo_db.AdminRefreshToken.create(
			{
				token: refreshToken,
				userId: username,
				expires: REFRESH_EXPIRATION_TIME,
			},
			(err, doc) => {
				if (err || !doc) {
					return false;
				}
			},
		);
		return refreshToken;
	}
}

const verifyRefreshToken = (token, username, res) => {
	try {
		// Verify the token and decode the payload
		const decoded = jwt.verify(token, REFRESH_SECRET);

		if (decoded.username !== username) {
			return res.status(404).send({ auth: false, message: "Token mismatch" });
		}

		if (decoded.privs == "Freelancer") {
			mongo_db.FreelancerRefreshToken.findOne({ token: token }, (err, doc) => {
				if (err || !doc) {
					return res.status(401).send({
						status: false,
						message: "Invalid refresh token, Log in again...",
					});
				}
				// Check that the refresh token has not expired
				if (doc.expires < new Date()) {
					return res.status(401).send({
						status: false,
						message: "Refresh token has expired, Log in again...",
					});
				}
				// Generate a new JWT for the user with the ID stored in the refresh token
				const jwt = createJWTtoken(decoded.username, decoded.privs);
				// Send the new JWT to the client
				res.send({ status: true, jwt });
			});
		}

		if (decoded.privs == "Admin") {
			mongo_db.AdminRefreshToken.findOne({ token: token }, (err, doc) => {
				if (err || !doc) {
					return res.status(401).send({
						status: false,
						message: "Invalid refresh token, Log in again...",
					});
				}
				// Check that the refresh token has not expired
				if (doc.expires < new Date()) {
					return res.status(401).send({
						status: false,
						message: "Refresh token has expired, Log in again...",
					});
				}
				// Generate a new JWT for the user with the ID stored in the refresh token
				const jwt = createJWTtoken(decoded.username, decoded.privs);
				// Send the new JWT to the client
				res.send({ status: true, jwt });
			});
		}
	} catch (err) {
		if (err.message == "jwt expired")
			return res.send({
				status: false,
				message: "Refresh token has expired, Log in again...",
			});
		return res.send({
			status: false,
			mesage: "Invalid refresh token, Log in again...",
		});
	}
};

// Middleware function to verify JWT
function verifyJWT(req, res, next) {
	// Get the user's username from the decoded token
	const username = req.headers["username"];
	const token = req.headers["taskedit-accesstoken"];
	const { isadmin } = req.headers;

	if (!token) {
		return res.status(401).send({ auth: false, message: "No token provided." });
	}
	// Verify the JWT and check that it is valid
	jwt.verify(
		token,
		isadmin == "true" || isadmin == true
			? ADMIN_JWT_SECRET
			: FREELANCER_JWT_SECRET,
		(err, decoded) => {
			if (err) {
				return res.status(404).send({ auth: false, message: err.message });
			}
			if (decoded.exp < Date.now() / 1000) {
				return res.status(401).send("JWT has expired");
			}
			// If the JWT is valid, save the decoded user information in the request object
			// so that it is available for the next middleware function
			if (decoded.username != username) {
				return res.status(404).send({ auth: false, message: "Token mismatch" }); // Token is not this users, but another users
			}

			req.decoded = decoded;
			next();
		},
	);
}

function confirmJWT(req, res) {
	// Get the user's username from the decoded token
	const username = req.body["username"];
	const token = req.body["taskedit-accesstoken"];
	const { isadmin = false } = req.body;

	if (!token) {
		return res.status(401).send({ auth: false, message: "No token provided." });
	}
	// Verify the JWT and check that it is valid
	jwt.verify(
		token,
		isadmin == true || isadmin == "true"
			? ADMIN_JWT_SECRET
			: FREELANCER_JWT_SECRET,
		(err, decoded) => {
			if (err) {
				return res.status(404).send({ auth: false, message: err.message });
			}
			if (decoded.exp < Date.now() / 1000) {
				return res.status(401).send("JWT has expired");
			}
			// If the JWT is valid, save the decoded user information in the request object
			// so that it is available for the next middleware function
			if (decoded.username != username) {
				return res.status(404).send({ auth: false, message: "Token mismatch" }); // Token is not this users, but another users
			}

			return res.send({ auth: true, message: "jwt valid and working" });
		},
	);
}

module.exports = {
	createJWTtoken,
	verifyJWT,
	verifyRefreshToken,
	generateRefreshToken,
	confirmJWT,
};
