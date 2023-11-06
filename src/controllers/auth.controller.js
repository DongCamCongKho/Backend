const jwt = require('jsonwebtoken');
const express = require('express');
const loginRouter = express.Router();
const { getOne, create } = require('../database/query');
// Thay thế require này bằng cách đúng cho định nghĩa của module xử lý cơ sở dữ liệu của bạn
const { hashPassword } = require('../helpers/hash'); // Đảm bảo bạn có module xử lý mật khẩu
const db = require('../database/connection');

loginRouter.post('/register', async (req, res, next) => {
    const { username, password, name, birthday, gender, email } = req.body; // Thay đổi trường "age" thành "birthday"
    console.log(req.body);
    try {
        const isUserExist = await getOne({
            db,
            query: "SELECT * FROM user WHERE username = ?",
            params: [username],
        });

        if (isUserExist) {
            res.status(400).json({ message: 'Username is already exist' });
        } else {
            // Đảm bảo hàm hashPasswordWithSalt() trả về một đối tượng chứa salt và hashedPw
            const { hashedPw, salt } = hashPassword(password);
            console.log(hashedPw);

            const result = await create({
                db,
                query: `INSERT INTO user (username, hashedPassword, salt, name, birthday, gender, email)  
                        VALUES (?, ?, ?, ?, ?, ?, ?)`, // Thay đổi trường "age" thành "birthday"
                params: [username, hashedPw, salt, name, birthday, gender, email] // Thay đổi trường "age" thành "birthday"
            });
            if (result) {
                res.status(200).json({ message: 'Registration successful' });
            } else {
                res.status(400).json({ message: 'Registration failed' });
            }
        }
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'An error occurred during registration' });
    }
});

module.exports = loginRouter;
