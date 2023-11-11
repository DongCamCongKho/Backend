const jwt = require('jsonwebtoken');



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
module.exports = { getUserNameFromToken, getRoleFromToken };