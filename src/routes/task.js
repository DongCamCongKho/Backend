const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.post('/',taskController.createTask);
router.get('/myTask',taskController.getMyTask);
router.get('/store',taskController.getStoreTask);
router.get('/:id',taskController.getTaskByID);
router.get('/',taskController.getTask);


router.put('/:id',taskController.updateTask);
router.delete('/:id',taskController.deleteTask);



//

router.post('/comment/:commentID/attachment',taskController.createCommentAttachment);
router.get('/comment/:commentID/attachment',taskController.getCommentAttachment);
router.get('/comment/:commentID/attachment/:attachmentID',taskController.getCommentAttachmentByID);






router.post('/:id/comment',taskController.createComment);
router.get('/:id/comment',taskController.getComment);
router.get('/:id/comment/:commentID',taskController.getCommentByID);
router.put('/:id/comment/:commentID',taskController.updateComment);
router.delete('/:id/comment/:commentID',taskController.deleteComment);
//front end handle attachment file

router.post('/:id/attachment',taskController.createAttachment);
router.get('/:id/attachment',taskController.getAttachment);
router.get('/:id/attachment/:attachmentID',taskController.getAttachmentByID);


module.exports = router;