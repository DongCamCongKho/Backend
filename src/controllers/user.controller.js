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
const getTotalRecord = async ()=>{
    try{

    result = await new Promise ((resolve,reject)=>
    {
        db.query("SELECT COUNT(*) as totalRecord FROM user",(err,result)=>{
        if (err) return reject(err)
        resolve(result)
    })})
    return result[0].totalRecord;
    }
    catch(err) 
    {}
}
// const getUser = (req,res)=>{
//     db.query("SELECT * FROM user",(err,result)=>{
//         if(err) throw err;
//         res.status(200).send(result)
//     })
// }
const getUser = async (req,res)=>{
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
    const result = await pagUser(page,pageSize).then((result)=>{
        return result;
    }).catch((err)=>{
        throw err;
    })
    const totalRecord = await getTotalRecord().then((result)=>{
        return result;
    }
    ).catch((err)=>{
        throw err;
    })

    res.status(200).send({result,totalRecord})

}
function  pagUser(page, pageSize) {

    return new Promise((resolve, reject) => {
  
      // calculate offset
  
      const offset = (page - 1) * pageSize;
  
      // construct the query with limit and offset
  
      const query = "SELECT * FROM user LIMIT ? OFFSET ?";
  
  
  
      db.query(query, [parseInt(pageSize, 10), offset], (err, results) => {
  
        if (err) {
  
          return reject(err);
  
        }
  
        return resolve(results);
  
      });
  
    });
  
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
    const id = req.params.id;
    const {username,password, name,email,birthday,role} = req.body
    
    if (password)
    {
    const { hashedPw, salt } = hashPassword(password);
    db.query("UPDATE user SET username = ?,hashedPassword = ?, salt = ?, name = ?, email = ?, birthday = ?, role = ? WHERE ID = ?",[username,hashedPw,salt,name,email,birthday,role,id],(err,result)=>{
        if(err) 
        { 
          //res.status(400).send("Update user failed");
          throw err;
        }
        res.status(200).send("updateUser")
    })
    }
    else 
    {
        db.query("UPDATE user SET username = ?,name = ?, email = ?, birthday = ?, role = ? WHERE ID = ?",[username,name,email,birthday,role,id],(err,result)=>{
            if(err) 
            { 
              //res.status(400).send("Update user failed");
              throw err;
            }
            res.status(200).send("updateUser")
        })
    
    }
}
const deleteUser = (req,res)=>{
    const {id} = req.params;
    db.query("DELETE FROM user WHERE id = ?",id,(err,result)=>{
        if(err) throw err;
        res.status(200).send("Delete user successfully")
    })
}

module.exports = {createUser,getUser,getUserByID,updateUser,deleteUser,getTotalRecord} 


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