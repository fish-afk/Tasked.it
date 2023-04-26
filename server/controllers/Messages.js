const Model = require("../models/Mysql_conn");
const MongoDB = require("../models/mongo_db");

function get_date() {
	const today = new Date();
	const day = today.getDate().toString().padStart(2, "0");
	const month = (today.getMonth() + 1).toString().padStart(2, "0");
	const year = today.getFullYear().toString();
	const date = `${day}/${month}/${year}`;

	return date;
}

function get_time() {
	const today = new Date();
	const hours = today.getHours().toString().padStart(2, "0");
	const minutes = today.getMinutes().toString().padStart(2, "0");
	const seconds = today.getSeconds().toString().padStart(2, "0");
	const time = `${hours}:${minutes}:${seconds}`;

	return time;
}

async function send_message(req, res) {
	const from = req.decoded["username"];
	const { Message, to, to_usertype = "Freelancer" } = req.body;

	if (!Message || !to || !to_usertype) {
		return res.send({ status: "FAILURE", message: "Missing details" });
	} else {
		if (to_usertype == "Freelancer") {
			const query = "SELECT * FROM Freelancers WHERE username = ?";

			Model.connection.query(query, [to], async (err, results) => {
				if (!err && results?.length > 0) {
					try {
						const record = new MongoDB.Messages({
							to: to,
							to_usertype: to_usertype,
							from: from,
							Message: Message,
							date_sent: get_date(),
							time_sent: get_time(),
						});

						await record.save();

						return res.send({ status: "SUCCESS", message: "Sent!" });
					} catch (err) {
						console.log(err);
						return res.send({ status: "FAILURE", message: "Try later" });
					}
				} else {
					console.log(err);
					return res.send({ status: "FAILURE", message: "No such user found" });
				}
			});
		} else if (to_usertype == "Admin") {
			const query = "SELECT * FROM Admins WHERE username = ?";
			Model.connection.query(query, [to], async (err, results) => {
				if (!err && results?.length > 0) {
					try {
						const record = new MongoDB.Messages({
							to: to,
							to_usertype: to_usertype,
							from: from,
							Message: Message,
							date_sent: get_date(),
							time_sent: get_time(),
						});

						await record.save();

						return res.send({ status: "SUCCESS", message: "Sent!" });
					} catch (err) {
						console.log(err);
						return res.send({ status: "FAILURE", message: "Try later" });
					}
				} else {
					console.log(err)
					return res.send({ status: "FAILURE", message: "No such user found" });
				}
			});
		} else {
			return res.send({ status: "FAILURE", message: "Unknown usertype given" });
		}
	}
}

function get_my_messages(req, res) {}

module.exports = {
	send_message,
	get_my_messages,
};
