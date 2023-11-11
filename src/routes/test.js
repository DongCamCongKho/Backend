const {getRoleFromToken,getUserNameFromToken} = require('../services/token');

const express = require('express');
const router = express.Router();

router.get('/', (req, res)  =>{
    const role = getRoleFromToken(req);
    const username = getUserNameFromToken(req);
    console.log(role);
    console.log(username);
    res.json({
        role,
        username
    });
})
module.exports = router;