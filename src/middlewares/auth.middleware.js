const jwt = require('jsonwebtoken');
require('dotenv').config();

function validateToken (req, res, next) {
    const authorization = req.headers.authorization;
    const token = authorization.substring(7);
    try {
        const isTokenValid = jwt.verify(token, publicKey, { algorithm: 'RS256' });
        if(isTokenValid) {
        res.locals.userToken = isTokenValid;
        next();
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}
 
module.exports = validateToken;