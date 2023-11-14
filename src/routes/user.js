const express = require('express');
const authMiddleware = require('../middlewares/user.middleware');
const controller = require('../controllers/user.controller');
const router = express.Router();


router.post('/',authMiddleware.registerValidate ,controller.createUser);
router.get('/totalRecord',controller.getTotalRecord);
router.get('/:id',controller.getUserByID);
router.get('/',controller.getUser);
router.put('/:id',controller.updateUser);
router.delete('/:id',controller.deleteUser);
module.exports = router;


