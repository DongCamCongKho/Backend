const jwt = require('jsonwebtoken');
const fs = require('fs')
const publicKey = fs.readFileSync('public_key.pem', 'utf8');
const privateKey = fs.readFileSync('private_key.pem', 'utf8');
function validateToken (req, res, next) {
        const authorization = req.headers.authorization;
        const token = authorization.substring(7);
        console.log(token);
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