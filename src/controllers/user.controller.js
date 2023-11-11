const db = require("../database/connection")
const {hashPassword,
    comparePassword,
    hashPasswordWithSaltFromDB} = require("../helpers/hash")
const {getUserNameFromToken, getRoleFromToken} = require("../services/token")
const createUser = (req,res)=>{
    const {username,name,email,password,gender,role,profilePicture} = req.body
    const hashedPassword = hashPassword(password);
    const salt = hashedPassword.salt;
    const hashedRawPassword = hashedPassword.hashedPassword;
    const createdAt = new Date();
    const user = {
        username,name,email,salt,hashedPassword : hashedRawPassword,gender,role,profilePicture,createdAt
    }                                           
    
    db.query("INSERT INTO user SET ?",user,(err,result)=>{
        if(err) throw err;
        res.status(200).send("Create user successfully")
    })
}
const getUser = (req,res)=>{
    db.query("SELECT * FROM user",(err,result)=>{
        if(err) throw err;
        res.status(200).send(result)
    })
}
const getUserByID =(req,res)=>{
    const {id} = req.params;
    db.query("SELECT * FROM user WHERE id = ?",id,(err,result)=>{
        if(err) throw err;
        res.status(200).send(result)
    })

}
const updateUser = (req,res)=>{
    // update casi gif? 
    res.status(200).send("updateUser")
}
const deleteUser = (req,res)=>{
    const {id} = req.params;
    db.query("DELETE FROM user WHERE id = ?",id,(err,result)=>{
        if(err) throw err;
        res.status(200).send("Delete user successfully")
    })
}

module.exports = {createUser,getUser,getUserByID,updateUser,deleteUser} 


// createUser = (req,res)=>{
//     res.send("createUser")
// }
// getUser =  (req, res) {
//     res.send("getUser")
// }
// updateUser = (req,res)=>{
//     res.send("updateUser")
// }
// deleteUser = (req,res)=>{
//     res.send("deleteUser")
// }