const express = require('express');
const router = express.Router();
const loginRouter = require('../controllers/auth.controller');

router.post('/register',loginRouter);
router.post('/login',loginRouter);
router.post('/upload',loginRouter);
module.exports = router;