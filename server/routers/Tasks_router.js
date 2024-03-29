const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/Tasks");
const authMiddleware = require("../middleware/AuthToken");


router.get("/gettasksduetoday", authMiddleware.verifyJWT, tasksController.get_total_tasks_due_today);
router.post("/gettasksforproject", authMiddleware.verifyJWT, tasksController.get_tasks_for_project);
router.get('/getalltasks', authMiddleware.verifyJWT, tasksController.get_all_tasks)
router.post('/newtask', authMiddleware.verifyJWT, tasksController.create_task)
router.patch('/edittask', authMiddleware.verifyJWT, tasksController.update_task)
router.patch('/markascomplete', authMiddleware.verifyJWT, tasksController.markasComplete);
router.delete("/deletetask", authMiddleware.verifyJWT, tasksController.delete_task);
router.get('/getmytasks', authMiddleware.verifyJWT, tasksController.get_my_tasks)

module.exports = router;
