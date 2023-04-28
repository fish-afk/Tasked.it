const express = require("express");
const router = express.Router();
const adminController = require("../controllers/Admins");
const authMiddleware = require('../middleware/AuthToken');

router.post("/login", adminController.login);
router.post("/refresh", adminController.refresh);
router.post("/register", authMiddleware.verifyJWT, adminController.registerAdmin);
router.put("/update", authMiddleware.verifyJWT, adminController.updateAdmin);
router.get(
	"/getAllAdmins",
	authMiddleware.verifyJWT,
	adminController.getAllAdmins,
);
router.get(
	"/:username",
	authMiddleware.verifyJWT,
	adminController.getAdminByUsername,
);
router.delete("/:username", adminController.deleteAdmin);
router.post("/confirmjwt", authMiddleware.confirmJWT);
router.post("/getnumbers", authMiddleware.verifyJWT, adminController.get_numbers);
router.patch("/changepassword", authMiddleware.verifyJWT, adminController.change_password)


module.exports = router;
