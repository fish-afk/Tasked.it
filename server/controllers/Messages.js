const Model = require("../models/Mysql_conn");
const MongoDB = require('../models/mongo_db');
const authMiddleware = require("../middleware/AuthToken");
const bcrypt = require("bcrypt");


function send_message(req, res) {

}

function get_my_messages(req, res) {
    
}

module.exports = {
    send_message,
    get_my_messages
}