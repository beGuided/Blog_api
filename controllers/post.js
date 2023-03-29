
const Post = require('../models/Post');
const {StatusCodes} = require('http-status-codes');
const{BadRequestError, NotFoundError} = require('../errors')


const getAllPost = async (req, res) =>{
 
    const posts = await Post.find({ createdBy: req.user.userId}).sort('cretedAt')
    res.status(StatusCodes.OK).json({ posts, count: posts.length })
  

}

const getPost = async (req, res) =>{
     const { user: {userId}, params: {id:postId}, } = req

    const post = await Post.findOne({ _id: postId, createdBy: userId})
    if(!post){
        throw new NotFoundError(`no post with id ${postId}`)
    }
   res.status(StatusCodes.OK).json({post})
   // res.json({ post})
}

const createPost = async (req, res) =>{
    req.body.createdBy = req.user.userId
    const post = await Post.create(req.body)
    res.status(StatusCodes.CREATED).json({post})
    
}

const updatePost = async (req, res) =>{
    const {
        body:{title,details,post_categories}, user: {userId}, params: {id:postId}, } = req

    if(title === '' || details === '' || post_categories === '' ){
        throw new BadRequestError('fields cannot be empty');
    }
    const post = await Post.findByIdAndUpdate({_id:postId, createdBy:userId}, req.body, {new:true, runValidators:true})
    if(!post){
        throw new NotFoundError(`no post with id ${postId}`)
    }
    res.status(StatusCodes.OK).json({ post })
    // res.send(' update post')
}


const deletePost = async (req, res) =>{
    const {user:{userId}, params:{id:postId}} = req
    
    const post = await Post. findByIdAndRemove({_id:postId, createdBy:userId})
    if(!post){
        throw new NotFoundError(`No post with such id ${postid}`)
    }
    res.status(StatusCodes.OK).send()
}


module.exports = {
    getAllPost, 
    getPost,
    createPost,
    updatePost,
    deletePost}
