const mysql = require("mysql2");

const uri = process.env.SQL_DATABASE_URL;
const connection = mysql.createConnection(uri);

connection.connect((err) => {
	if (err) console.log("Error connecting to mysql db❌" + err);
	else console.log("Connected to mysql db! ✅");
});

module.exports = { connection };
