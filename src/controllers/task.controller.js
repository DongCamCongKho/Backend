const db = require("../database/connection")


const createTask = (req, res) => {
    const { title, description, deadline } = req.body
    const status = "doing";
    const createdAt = new Date();
    //postedBy get from token
    const task = {
        title, description, status, deadline, createdAt
    }
    db.query("INSERT INTO task SET ?", task, (err, result) => {
        if (err) throw err;
        res.status(200).json(task);
    })
}

const getTask = (req, res) => {
    db.query("SELECT * FROM task", (err, result) => {
        if (err) throw err;
        res.status(200).send(result)
    })
}
const getTaskByID = (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM task WHERE id = ?", id, (err, result) => {
        if (err) throw err;
        res.status(200).send(result)
    })

}
const updateTask = (req, res) => {
    // update casi gif? 
    res.status(200).send("updateTask")
}
const deleteTask = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM task WHERE id = ?", id, (err, result) => {
        if (err) throw err;
        res.status(200).send("Delete task successfully")
    })
}

const createComment = (req, res) => {
    const { content } = req.body
    const createdAt = new Date();
    //const postedBy
    //postedBy get from token
   
    const taskID = req.params.id;
    const comment = {
        content, createdAt, taskID,updateAT : createdAt
    }
    db.query("INSERT INTO comment SET ?", comment, (err, result) => {
        if (err) throw err;
        res.status(200).json(comment);
    })

}

const getComment = (req, res) => {
    db.query("SELECT * FROM comment", (err, result) => {
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
    res.status(200).send("updateComment")
}
const deleteComment = (req, res) => {
    const { id } = req.params.commentID;
    db.query("DELETE FROM comment WHERE id = ?", id, (err, result) => {
        if (err) throw err;
        res.status(200).send("Delete comment successfully")
    })
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
    db.query("SELECT * FROM attachment",(err,result)=>{
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


module.exports = {createTask, getTask, getTaskByID, updateTask,
                 deleteTask, createComment, getComment,
                getCommentByID, updateComment, deleteComment,
                createAttachment,getAttachment,getAttachmentByID}