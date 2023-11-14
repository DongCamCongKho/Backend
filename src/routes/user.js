const express = require('express');
const authMiddleware = require('../middlewares/user.middleware');
const controller = require('../controllers/user.controller');
const router = express.Router();


router.post('/',authMiddleware.registerValidate ,controller.createUser);

router.get('/',controller.getUser);
router.get('/:id',controller.getUserByID);
router.put('/:id',controller.updateUser);
router.delete('/:id',controller.deleteUser);
module.exports = router;


