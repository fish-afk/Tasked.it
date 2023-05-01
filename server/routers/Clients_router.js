const express = require("express");
const router = express.Router();
const clientsController = require("../controllers/Clients_");
const authMiddleware = require("../middleware/AuthToken");


router.get('/getallclients', authMiddleware.verifyJWT, clientsController.getAllClients);
router.post('/newclient', authMiddleware.verifyJWT, clientsController.createClient);
router.patch('/editclient', authMiddleware.verifyJWT, clientsController.updateClientByName);
router.delete('/deleteclient', authMiddleware.verifyJWT, clientsController.deleteClientByName);


module.exports = router;