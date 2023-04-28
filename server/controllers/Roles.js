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



async function deleteRole(req, res) {
    let role_id = req.body['id'];

    if (req.decoded.privs !== "Admin") {
        return res.send({
            status: "FAILURE",
            message: "Insufficient privileges",
        });
    } else {

        Model.connection.query(
            "DELETE FROM Roles WHERE id = ?",
            [role_id],
            (err, result) => {
                if (err)
                    res.status(500).send({ status: "FAILURE", message: "Unknown error" });
                if (result.affectedRows === 0) {
                    res
                        .status(404)
                        .send({ status: "FAILURE", message: "Role not found." });
                } else {
                    res.send({
                        status: "SUCCESS",
                        message: `Role with id ${role_id} deleted successfully.`,
                    });
                }
            },
        );
    }
}





module.exports = {
    get_all_roles,
    deleteRole
}