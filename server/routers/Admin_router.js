const express = require("express");
const router = express.Router();
const adminController = require("../controllers/Admins");

router.post("/login", adminController.login);
router.post("/refresh", adminController.refresh);
router.post("/register", adminController.registerAdmin);
router.put("/update", adminController.updateAdmin);
router.get("/getAllAdmins", adminController.getAllAdmins);
router.get("/:username", adminController.getAdminByUsername);
router.delete("/:username", adminController.deleteAdmin);

module.exports = router;
