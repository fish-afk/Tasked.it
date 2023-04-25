const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const uri = process.env.MONGO_DB_DATABASE_URL;

mongoose
	.connect(uri)
	.then(() => console.log("Connected to Mongo db ✅"))
	.catch((err) => {
		console.log("Error connecting to Mongo db ❌");
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

const MessagesSchema = new mongoose.Schema({
	Message: { type: String, required: true },
	from: { type: String, required: true },
	to: { type: String, required: true },
	to_usertype: { type: String, required: true }, // sending to admin or freelancer
	date_sent: { type: Date },
	time_sent: { type: String },
});

const AdminRefreshToken = mongoose.model(
	"AdminRefreshToken",
	AdminRefreshTokenSchema,
);

const FreelancerRefreshToken = mongoose.model(
	"FreelancerRefreshToken",
	FreelancerRefreshTokenSchema,
);

const Messages = mongoose.model("Messages", MessagesSchema);

module.exports = { AdminRefreshToken, FreelancerRefreshToken, Messages };
