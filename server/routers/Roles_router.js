const express = require("express");
const router = express.Router();
const RolesController = require("../controllers/Roles");
const authMiddleware = require("../middleware/AuthToken");

router.get("/getallroles",authMiddleware.verifyJWT, RolesController.get_all_roles);
router.delete('/deleterole', authMiddleware.verifyJWT, RolesController.deleteRole)
router.patch('/editrole', authMiddleware.verifyJWT, RolesController.editrole)
router.post('/newrole', authMiddleware.verifyJWT, RolesController.addrole)

module.exports = router;