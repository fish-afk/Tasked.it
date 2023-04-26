const Model = require("../models/Mysql_conn");
const MongoDB = require("../models/mongo_db");
const authMiddleware = require("../middleware/AuthToken");
const bcrypt = require("bcrypt");


function get_all_roles(req, res) {

    if (req.decoded.privs !== "Admin") {
        return res.send({ status: "FAILURE", message: "Insufficient privileges" });
        
    } else {
        const query = "SELECT * FROM Roles";

        Model.connection.query(query, (err, results) => {
            if (!err && results) {
                return res.send({status: 'SUCCESS', data: results})
            } else {
                console.log(err)
                return res.send({ status: 'FAILURE', message: 'Uknown error' });
            }
        })
    }

}


module.exports = {
    get_all_roles
}