const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/task', require('./task'));
router.use('/manager', require('./manager'));
router.use('/auth', require('./auth'));


module.exports = router;