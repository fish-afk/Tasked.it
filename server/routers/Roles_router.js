const express = require("express");
const router = express.Router();
const RolesController = require("../controllers/Roles");
const authMiddleware = require("../middleware/AuthToken");


router.post("/getallroles",authMiddleware.verifyJWT, RolesController.get_all_roles);



module.exports = router;