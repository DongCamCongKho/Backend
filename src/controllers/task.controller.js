const db = require("../database/connection")
const {getUserNameFromToken, getRoleFromToken} = require("../services/token")

const createTask = (req, res) => {
    const { title, description, deadline } = req.body
    const status = "doing";
    const createdAt = new Date();
    //postedBy get from token
    //username get from token
    postedBy = getUserNameFromToken(req);
    const task = {
        title, description, status, deadline, createdAt,postedBy
    }
    db.query("INSERT INTO task SET ?", task, (err, result) => {
        if (err) throw err;
        task.ID  = result.insertId;
        res.status(200).json(task);
    })
}
const getMyTask = async (req, res) => {

    try{
        const username = getUserNameFromToken(req);
        const result = await new Promise((resolve,reject) =>{ 
            db.query("SELECT task.*,user.name as name, user.ID as userID, CONCAT('/avts/', MOD(user.ID, 20), '.png') as profilePicture FROM task INNER JOIN user ON task.postedBy = user.username WHERE task.postedBy = ? AND status!='store'", username, (err, results) => {
            if (err) return reject(err)
            resolve(results);
            
        })
    })
        res.status(200).json(result);

    }
    catch(err)
    {}
}

// const getTask = async (req, res) => {
//     try {

//     const result  = await new Promise((resolve,reject) =>{ 
//                 db.query("SELECT task.*,user.name as name, user.ID as userID, CONCAT('/avts/', MOD(user.ID, 20), '.png') as profilePicture FROM task INNER JOIN user ON task.postedBy = user.username ", (err, results) => {
//                 if (err) return reject(err)
//                 resolve(results);
                
//             })
//     })
    
//     res.status(200).json(result);
//     }
//     catch(err)
//     {
//         throw err;
//     }
    

// }
const getTaskByID = (req, res) => {
    const { id } = req.params;
    db.query("SELECT task.*,user.name as name, user.ID as userID, CONCAT('/avts/', MOD(user.ID, 20), '.png') as profilePicture FROM task INNER JOIN user ON task.postedBy = user.username  WHERE task.id = ?", id, (err, result) => {
        if (err) throw err;
        res.status(200).send(result)
    })

}
const updateTask = (req, res) => {
    // update casi gif? 
    const {status} = req.body;
    const updatedAt = new Date();
    const {id} = req.params;
    db.query("UPDATE task SET status = ?, updatedAt = ? WHERE id = ?",[status,updatedAt,id],(err,result)=>{
        if(err) throw err;
    })
    res.status(200).send("updated Task "+ status)
}
const deleteTask = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM task WHERE id = ?", id, (err, result) => {
        if (err) throw err;
        res.status(200).send("Delete task successfully")
    })
}

const createComment = async (req, res) => {
    try {
    const { content } = req.body
    const createdAt = new Date();
    //const postedBy
    //postedBy get from token
    postedBy = getUserNameFromToken(req);
    const taskID = req.params.id;
    const comment = {
        content, createdAt, taskID,updatedAt : createdAt,postedBy
    }
    const commentInf = await new Promise((resolve,reject)=>{ 
         db.query("INSERT INTO comment SET ?", comment, (err, result) => 
        {
        if (err) reject(err);
        resolve(result);
        })
        })
    const commentResult = await new Promise((resolve,reject)=>{
        db.query("SELECT comment.* , CONCAT('/avts/', MOD(user.ID, 20), '.png') as profilePicture, user.name,user.role FROM comment INNER JOIN user ON comment.postedBy = user.username WHERE comment.ID =?",[commentInf.insertId],(err,result)=>{
        if (err) reject(err);
        resolve(result);       
        })
    })
    res.status(200).json(commentResult);

    

    }
    catch(err)
    {
        throw err;
    }

}

const getComment = (req, res) => {
    taskID = req.params.id;
    db.query("SELECT comment.* , CONCAT('/avts/', MOD(user.ID, 20), '.png') as profilePicture, user.name,user.role FROM comment INNER JOIN user ON comment.postedBy = user.username WHERE taskID =?",[taskID] ,(err, result) => {
        if (err) throw err;
        res.status(200).send(result)
    })
}

const getCommentByID = (req, res) => {
    const { id } = req.params.commentID;
    db.query("SELECT * FROM comment WHERE id = ?", id, (err, result) => {
        if (err) throw err;
        res.status(200).send(result)
    })

}

const updateComment = (req, res) => {
    // update casi gif? 
    // const { content } = req.body
    // const updateAt = new Date();

    res.status(200).send("updateComment")
}
const deleteComment = (req, res) => {
    const { id } = req.params.commentID;
    db.query("DELETE FROM comment WHERE id = ?", id, (err, result) => {
        if (err) throw err;
        res.status(200).send("Delete comment successfully")
    })
}
const getStoreTask = async (req,res)=>{
    try{
        const result = await new Promise((resolve,reject) =>{ 
            db.query("SELECT task.*,user.name as name, user.ID as userID, CONCAT('/avts/', MOD(user.ID, 20), '.png') as profilePicture FROM task INNER JOIN user ON task.postedBy = user.username WHERE status='store'", (err, results) => {
            if (err) return reject(err)
            resolve(results);
            
        })
    })
        res.status(200).json(result);

    }
    catch(err)
    {}

}



const createAttachment = (req,res)=>{
    const {name,path,type,size} = req.body;
    const createdAt = new Date();
    const taskID = req.params.id;
    const attachment = {
        name,path,type,size,createdAt,taskID
    }
    db.query("INSERT INTO attachment SET ?",attachment,(err,result)=>{
        if(err) throw err;
        res.status(200).json(attachment);
    })
}


const getAttachment = (req,res)=>{
    const taskID = req.params.id;
    db.query("SELECT * FROM attachment where taskID = ?",[taskID],(err,result)=>{
        if(err) throw err;
        res.status(200).send(result)
    })
}

const getAttachmentByID = (req,res)=>{
    const {id} = req.params.attachmentID;
    db.query("SELECT * FROM attachment WHERE id = ?",id,(err,result)=>{
        if(err) throw err;
        res.status(200).send(result)
    })
}
const getTask = (req,res)=>{
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
    pagTask(page,pageSize).then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        throw err;
    })

}
function  pagTask(page, pageSize) {

    return new Promise((resolve, reject) => {
  
      // calculate offset
  
      const offset = (page - 1) * pageSize;
  
      // construct the query with limit and offset
  
      const query = "SELECT task.*,user.name as name, user.ID as userID, CONCAT('/avts/', MOD(user.ID, 20), '.png') as profilePicture FROM task INNER JOIN user ON task.postedBy = user.username WHERE status!='store'  LIMIT ? OFFSET ?";
  
  
  
      db.query(query, [parseInt(pageSize, 10), offset], (err, results) => {
  
        if (err) {
  
          return reject(err);
  
        }
  
        return resolve(results);
  
      });
  
    });
  
  }

module.exports = {createTask, getTask, getTaskByID, updateTask,
                 deleteTask, createComment, getComment,
                getCommentByID, updateComment, deleteComment,
                createAttachment,getAttachment,getAttachmentByID,getMyTask,getStoreTask}