const express = require("express");
const router = express.Router();
const adminController = require("../controllers/Admins");
const authMiddleware = require('../middleware/AuthToken');

router.post("/login", adminController.login);
router.post("/refresh", adminController.refresh);
router.post("/register", adminController.registerAdmin);
router.put("/update", adminController.updateAdmin);
router.get("/getAllAdmins", adminController.getAllAdmins);
router.get("/:username", adminController.getAdminByUsername);
router.delete("/:username", adminController.deleteAdmin);
router.post("/confirmjwt", authMiddleware.confirmJWT);

module.exports = router;
