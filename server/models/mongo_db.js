const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const uri = process.env.MONGO_DB_DATABASE_URL;

mongoose
	.connect(uri)
	.then(() => console.log("Connected to mongo db ✅"))
	.catch((err) => {
		console.log("Error connecting to mongo db ❌");
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