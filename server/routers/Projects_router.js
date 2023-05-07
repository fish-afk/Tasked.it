const express = require("express");
const router = express.Router();
const ProjectsController = require("../controllers/Projects");
const authMiddleware = require("../middleware/AuthToken");


router.get('/getallprojects', authMiddleware.verifyJWT, ProjectsController.get_all_projects);
router.patch('/editproject', authMiddleware.verifyJWT, ProjectsController.edit_project);
router.post("/newproject", authMiddleware.verifyJWT, ProjectsController.new_project);
router.delete("/deleteproject", authMiddleware.verifyJWT, ProjectsController.delete_project);
router.patch('/markascomplete', authMiddleware.verifyJWT, ProjectsController.markasComplete);
module.exports = router;
