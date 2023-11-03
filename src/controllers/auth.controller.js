const jwt = require('jsonwebtoken');
const express = require('express');
const loginRouter = express.Router();
const { getOne, create } = require('../database/query');

loginRouter.post('/register', async (req, res, next) => {
    const { username, password, name, age, gender, email } = req.body;
    console.log(req.body.password);
    try {
        const isUserExist = await getOne({
            db,
            query: "SELECT * FROM user WHERE username = ?",
            params: [username], // Đảm bảo truyền tham số dưới dạng mảng
        });

        if (isUserExist) {
            res.json({ message: 'Username is already exist' });
        } else {
            // Đảm bảo hàm hashPasswordWithSalt() trả về một đối tượng chứa salt và hashedPw
            const { salt, hashedPw } = hashPasswordWithSalt(password);

            const result = await create({
                db,
                query: `INSERT INTO user (username, password, salt, name, age, gender, email)  
                        VALUES (?, ?, ?, ?, ?, ?, ?)`,
                params: [username, hashedPw, salt, name, age, gender, email]
            });
            
            res.status(200).json({ message: 'Register success' });
        }
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'An error occurred during registration' });
    }
});