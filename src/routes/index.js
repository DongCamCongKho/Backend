const express = require('express');
const router = express.Router();
const { validateToken } = require('../services/token');

router.use('/user', require('./user'));
router.use('/task',validateToken, require('./task'));
//router.use('/manager', require('./manager'));
router.use('/auth', require('./auth'));

router.use('/test',require('./test'));

module.exports = router;