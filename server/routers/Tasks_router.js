const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/Tasks");
const authMiddleware = require("../middleware/AuthToken");


router.get("/gettasksduetoday", authMiddleware.verifyJWT, tasksController.get_total_tasks_due_today);
router.get("/gettasksforproject", authMiddleware.verifyJWT, tasksController.get_tasks_for_project);

module.exports = router;
