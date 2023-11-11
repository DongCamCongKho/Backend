const express = require('express');
const router = express.Router();
const managerController = require('../controllers/manager.controller');

router.get('/', managerController.getManager);
router.get('/:id', managerController.getManagerByID);




module.exports = router;