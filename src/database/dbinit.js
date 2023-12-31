const db = require("../database/connection");

const createRole = `CREATE TABLE IF NOT EXISTS role (

            ID INT PRIMARY KEY,

            name VARCHAR(10) UNIQUE

        );`;

const roleInit = `

        INSERT INTO role (id,name) 

        VALUES ('1','admin'), 

            ('2','manager'), 

            ('3','user')

        ON DUPLICATE KEY UPDATE

        id = id,

        name = name;

        `;

const createUser = `

        CREATE TABLE IF NOT EXISTS user (

            ID INT AUTO_INCREMENT PRIMARY KEY,

            username VARCHAR(50) UNIQUE,

            name VARCHAR(50), 

            email VARCHAR(50),

            gender BOOLEAN,

            birthday DATE, 

            role INT references role(ID),

            profilePicture VARCHAR(255),

            salt VARCHAR(255) NOT NULL UNIQUE,

            passwordResetToken VARCHAR(255),

            passwordResetExpires DATETIME,

            hashedPassword VARCHAR(255) NOT NULL,

            createdAt DATETIME

        );

        `;

const taskInit = `
        CREATE TABLE IF NOT EXISTS task (

            ID INT AUTO_INCREMENT PRIMARY KEY,

            title VARCHAR(255),

            description TEXT,

            status ENUM('doing','done','store'),

            createdAt DATETIME,

            updatedAt DATETIME,

            deadline DATETIME,

            postedBy VARCHAR(50) references user(username)
        );
            

`

const comment = `
        CREATE TABLE IF NOT EXISTS comment (
                
                ID INT AUTO_INCREMENT PRIMARY KEY,
    
                content TEXT,
    
                createdAt DATETIME,
    
                updatedAt DATETIME,
    
                TaskID INT references task(ID),
    
                postedBy VARCHAR(50) references user(username)
    
            );
        `;

const attachment = `

        CREATE TABLE IF NOT EXISTS attachment (

            ID INT AUTO_INCREMENT PRIMARY KEY,

            name VARCHAR(255) NOT NULL,

            path VARCHAR(255) NOT NULL,

            type VARCHAR(255) NOT NULL,

            size INT NOT NULL,

            createdAt DATETIME,

            TaskID INT references task(ID)

        );

        `;


const commentAttachment = `

        CREATE TABLE IF NOT EXISTS commentAttachment (

            ID INT AUTO_INCREMENT PRIMARY KEY,

            name VARCHAR(255) NOT NULL,

            path VARCHAR(255) NOT NULL,

            type VARCHAR(255) NOT NULL,

            size INT NOT NULL,

            createdAt DATETIME,

            commentID INT references comment(ID)

        );

        `;

function run() {

    db.query(createRole, (err, result) => {

    if (err) throw err;

    console.log("Role table created.");

    });

    db.query(createUser, (err, result) => {

        if (err) throw err;

        console.log("User table created.");

        });

    db.query(roleInit, (err, result) => {

        if(err) throw err;

        console.log("Role data inserted.");

    });
    db.query(taskInit, (err, result) => {

        if(err) throw err;

        console.log("Task table created.");

    });
    db.query(comment, (err, result) => {   
        if(err) throw err;
        console.log("Comment table created.");
    });
    db.query(attachment, (err, result) => { 
        if(err) throw err;
        console.log("Attachment table created.");
    });
    db.query(commentAttachment, (err, result) => { 
        if(err) throw err;
        console.log("Comment Attachment table created.");
    });


}

module.exports = run;