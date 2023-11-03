const crypto = require('crypto');

// function hashPassword(plainPassword) {
//     const salt = crypto.randomBytes(16).toString('hex');
//     const hashedPassword = crypto.pbkdf2Sync(plainPassword, salt, 100, 64, 'sha512').toString('hex');
//     return { hashedPassword, salt};
// }
function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex'); // Giới hạn salt chỉ có 32 ký tự
    console.log(salt);
    const hashedPw = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return {
        salt,
        hashedPw
    }
}
function comparePassword(hashedPassword, salt, plainPassword) {
    const hashedRawPassword = crypto.pbkdf2Sync(plainPassword, salt, 100, 64, `sha512`).toString(`hex`);
    return hashedPassword===hashedRawPassword;
}

module.exports = {
    hashPassword,
    comparePassword,
};