
const Comment = require('../models/Comment');
const {StatusCodes} = require('http-status-codes');
const{BadRequestError, NotFoundError} = require('../errors')


const getAllComment = async (req, res) =>{
 
    const comments = await Comment.find({ }).sort('cretedAt')
    res.status(StatusCodes.OK).json({ comments, count: comments.length })


}

const getComment = async (req, res) =>{
   
}

const createComment = async (req, res) =>{
   // req.body.createdBy = req.user.userId
    const comment = await Comment.create(req.body)
    res.status(StatusCodes.CREATED).json({comment})
    
}

 const updateComment = async (req, res) =>{
//     const {
//         body:{name,email,details,post_id}, user: {userId}, params: {id:postId}, } = req

//     if(name === '' || details === '' || email === ''|| post_id === ''  ){
//         throw new BadRequestError('fields cannot be empty');
//     }
//     const post = await Comment.findByIdAndUpdate({_id:postId, createdBy:userId}, req.body, {new:true, runValidators:true})
//     if(!post){
//         throw new NotFoundError(`no post with id ${postId}`)
//     }
//     res.status(StatusCodes.OK).json({ post })
//     // res.send(' update post')
 }


const deleteComment = async (req, res) =>{
    const {user:{userId}, params:{id:commentId}} = req
    
    const comment = await Comment. findByIdAndRemove({_id:commentId, })
    if(!comment){
        throw new NotFoundError(`No comment with such id ${commentid}`)
    }
    res.status(StatusCodes.OK).send()
}


module.exports = {
    getAllComment, 
    getComment,
    createComment,
    updateComment,
    deleteComment}
