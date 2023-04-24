const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const uri = process.env.MONGO_DB_DATABASE_URL;

mongoose.connect(uri, (err) => {
	if (!err) console.log("Connection to mongo DB Successful! ✅");
	else {
		console.log("Error connecting to mongo DB ❌");
	}
});


const AdminRefreshTokenSchema = new mongoose.Schema({
	token: { type: String, required: true, unique: true },
	userId: { type: String, required: true },
	expires: { type: Date, required: true },
});


const FreelancerRefreshTokenSchema = new mongoose.Schema({
	token: { type: String, required: true, unique: true },
	userId: { type: String, required: true },
	expires: { type: Date, required: true },
});


const AdminRefreshToken = mongoose.model(
	"AdminRefreshToken",
	AdminRefreshTokenSchema,
);


const FreelancerRefreshToken = mongoose.model(
	"FreelancerRefreshToken",
	FreelancerRefreshTokenSchema,
);


module.exports = { AdminRefreshToken, FreelancerRefreshToken };