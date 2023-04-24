const express = require("express");
const router = express.Router();
const FreelancerController = require("../controllers/Freelancers");
const authMiddleware = require("../middleware/AuthToken");

router.post("/login", FreelancerController.login);
router.post("/refresh", FreelancerController.refresh);
router.post("/register", FreelancerController.registerFreelancer);
router.put("/update", FreelancerController.updateFreelancer);
router.get("/getAllAdmins", FreelancerController.getAllFreelancers);
router.get("/:username", FreelancerController.getFreelancerByUsername);
router.delete("/:username", FreelancerController.deleteFreelancer);
router.post("/confirmjwt", authMiddleware.confirmJWT);

module.exports = router;
