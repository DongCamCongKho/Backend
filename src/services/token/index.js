const jwt = require('jsonwebtoken');

function validateToken(res, req, next) {
    const authorization = req.headers.authorization;
    
    if (!authorization)
    res.status(400).json({ message: 'Authorization header is required' });


    const token = authorization.substring(7);
    try {
        const isTokenValid = jwt.verify(token, publicKey, { algorithm: 'RS256' });
        if (isTokenValid) {
            res.locals.userToken = isTokenValid;
            next();
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

function getToken (req) {
    const authorization = req.headers.authorization;
    const token = authorization.substring(7);
    return token;
}

function getUserNameFromToken(req) {
    const token = getToken(req);
    const decoded = jwt.decode(token);
    return decoded.username;
}
function getRoleFromToken(req) {
    const token = getToken(req);
    const decoded = jwt.decode(token);
    return decoded.role;
}
module.exports = { getUserNameFromToken, getRoleFromToken,validateToken };