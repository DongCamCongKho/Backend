const express = require('express');
const router = express.Router();
const authRouter = require('../controllers/auth.controller');

router.post('/register',authRouter);
router.post('/login',authRouter);
router.post('/upload',authRouter);
module.exports = router;