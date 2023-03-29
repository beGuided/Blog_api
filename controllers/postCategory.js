
const Category = require('../models/Category');
const {StatusCodes} = require('http-status-codes');
const{BadRequestError, NotFoundError} = require('../errors')


const getAllCategory = async (req, res) =>{
    const categorys = await Category.find()
    if(!categorys){
        throw new NotFoundError(`you dont have any category`)
    }
    res.status(StatusCodes.OK).json({ categorys, count: categorys.length })
 
}

const getCategory = async (req, res) =>{
     const { params: {id:categoryId}, } = req

    const category = await Category.findOne({ _id: categoryId})
    if(!category){
        throw new NotFoundError(`no category with id ${categoryId}`)
    }
   res.status(StatusCodes.OK).json({category})
    // res.json(req.params)
}

const createCategory = async (req, res) =>{
   // req.body.createdBy = req.user.userId
    const category = await Category.create(req.body)
    res.status(StatusCodes.CREATED).json({category})
   
    
}

const updateCategory = async (req, res) =>{
    const {
        body:{name}, params: {id:categoryId}, } = req

    if(name === '' ){
        throw new BadRequestError('name field cannot be empty');
    }
    const category = await Category.findByIdAndUpdate({_id:categoryId}, req.body, {new:true, runValidators:true})
    if(!category){
        throw new NotFoundError(`no category with id ${categoryId}`)
    }
    res.status(StatusCodes.OK).json({ category })
    // res.send(' update category')
}


const deleteCategory = async (req, res) =>{
    const {user:{userId}, params:{id:categoryId}} = req
    
    const category = await Category. findByIdAndRemove({_id:categoryId})
    if(!category){
        throw new NotFoundError(`No category with such id ${categoryid}`)
    }
    res.status(StatusCodes.OK).send()
}


module.exports = {
    getAllCategory, 
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory}
