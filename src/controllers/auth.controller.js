const jwt = require('jsonwebtoken');
import { registerValidate } from '../middlewares/user.middleware';
import { validateToken } from '../services/token';
const fs = require('fs');
const express = require('express');
const authRouter = express.Router();
const { getOne, create } = require('../database/query');
const { hashPassword, hashPasswordWithSaltFromDB } = require('../helpers/hash');
const db = require('../database/connection');
expireTime = 60 * 60 * 24 * 7;
const options = { expiresIn: expireTime };
const publicKey = fs.readFileSync('public_key.pem', 'utf8');
const privateKey = fs.readFileSync('private_key.pem', 'utf8');
const fileUpload = require('express-fileupload');
const updatedContentDisposition = 'inline';
var AWS = require('aws-sdk');
authRouter.use(fileUpload());
authRouter.post('/upload',validateTokens, async (req, res) => {

    AWS.config.update({
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        region: 'eu-north-1'
    });
    const s3 = new AWS.S3();
    const fileData = req.files.data; // Truy cập dữ liệu tệp từ yêu cầu

    // Đặt Content-Disposition thành 'inline' trước khi tải lên
    fileData.ContentDisposition = 'attachment';
    req.files.data.mimetype = 'application/pdf';
    console.log(fileData);
    const fileContent = Buffer.from(req.files.data.data, 'binary');
    const params = {
        Bucket: 'finalsgroup',
        Key: req.files.data.name,
        Body: fileContent,
        ACL: 'public-read',
        MetadataDirective: 'REPLACE',
        ContentDisposition: updatedContentDisposition,
        ContentType:    req.files.data.mimetype
    };
    s3.upload(params, function (err, data) {
        if (err) {
            throw err;
        }
        res.send({
            "responseCode": 200,
            "responseMessage": "success",
            "response": data
        })
    });
});

authRouter.post('/register',registerValidate,async (req, res, next) => {
    const { username, password, role, name, birthday, gender, email } = req.body;
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
            const { hashedPw, salt } = hashPassword(password);
            console.log(hashedPw);

            const result = await create({
                db,
                query: `INSERT INTO user (username, hashedPassword, role ,salt, name, birthday, gender, email)  
                        VALUES (?, ?, ?, ?, ?, ?, ?,?)`,
                params: [username, hashedPw, role, salt, name, birthday, gender, email]
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


authRouter.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const isUserValid = await getOne({
            db,
            query: "SELECT * FROM user WHERE username = ?",
            params: username,
        });
        if (!isUserValid) {
            res.status(400).json({ message: 'Account does not exist' });
        } else {
            const salt = isUserValid.salt;
            const hashedPw = isUserValid.hashedPassword;
            const hashedPwFromDB = hashPasswordWithSaltFromDB(password, salt).hashedPw;
            console.log(hashedPw);
            if (hashedPwFromDB.localeCompare(hashedPw) === 0) {
                const token = jwt.sign({ username: isUserValid.username, role : isUserValid.role , ID : isUserValid.ID}, privateKey, { algorithm: 'RS256' });
                res.status(200).json({ token });
            } else {
                res.status(400).json({ message: 'Username or password is incorrect' });
            }
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
});






module.exports = authRouter;
