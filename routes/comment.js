const express= require('express');
const router = express.Router();

const {
    getAllComment, 
    getComment,
    createComment,
    updateComment,
    deleteComment
} = require('../controllers/comment')

router.route('/').post(createComment).get(getAllComment)
router.route('/:id').get(getComment).patch(updateComment).delete(deleteComment)


module.exports = router