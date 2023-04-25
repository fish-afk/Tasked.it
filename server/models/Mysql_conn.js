const mysql = require("mysql2");

const uri = process.env.SQL_DATABASE_URL;
const connection = mysql.createConnection(uri);

connection.connect((err) => {
	if (err) console.log("Error connecting to MySQL db ❌" + err);
	else console.log("Connected to MySQL db ✅");
});

module.exports = { connection };
