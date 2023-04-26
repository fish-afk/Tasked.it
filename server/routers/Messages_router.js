const express = require("express");
const router = express.Router();
const MessagesController = require("../controllers/Messages");
const authMiddleware = require("../middleware/AuthToken");


router.post("/sendmessage", authMiddleware.verifyJWT, MessagesController.send_message);


module.exports = router;