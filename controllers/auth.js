const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')
// const bcrypt =  require ('bcryptjs')
//const jwt = require('jsonwebtoken')

const register = async (req, res) =>{

    
    /**********
    Validation in the controller
    *************/
  //   const {name,email,password} = req.body; 

  //   if(!name || !email || !password) {
  //       throw new BadRequestError ('Please provie name, email and password')
  //   }
  //  const user = await User.create({...req.body})   
  //   res.status(StatusCodes.CREATED).json({user})

    /*************** 
     * hashed password in controller
     **********/
    //const {name,email,password} = req.body; 

    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(password, salt);

    // const tempUser = {name,email,password: hashedPassword}

   // const user = await User.create({...tempUser})
    // res.status(StatusCodes.CREATED).json({uer})

       /*************** 
     * Jwt in controller
     **********/
   // const User = await User.create({...req.body})
   // const token = jwt.sign({userID: user._id, name: user.name}, 'jwtSecret',{
    // expiresIn:'30d',})
    // res.status(StatusCodes.CREATED).json({user: {name:user.name}, token})
 
    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })

}


const login = async (req, res) =>{
  const {email, password} = req.body

   if(!email || !password){
    throw new BadRequestError('Please provide email and password')
   }
const user = await User.findOne({email})
// compare password
    if(!user){
      throw new UnauthenticatedError('Invalid login Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
      throw new UnauthenticatedError('Invalid login Credentials')
    }

    // compare password
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user: {name: user.name}, token})
}

  



module.exports = {
  register, 
  login, 
}
