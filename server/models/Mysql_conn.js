const mysql = require("mysql2");

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Shihab786..",
	database: "TaskedIt",
});

connection.connect((err) => {
	if (err) console.log("Error connecting to sql DB ❌");
	else console.log("Connection to sql DB Successful! ✅");
});

module.exports = { connection };
