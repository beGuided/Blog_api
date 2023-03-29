
const mongoose = require('mongoose');
const bcrypt =  require ('bcryptjs');
const jwt = require('jsonwebtoken')

const CommentSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,'please provide name'],
        minlength:3,
        maxlength:50,
    }, 
    email:{
        type:String,
        required:[true, 'please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],       
    },

    details:{
        type:String,
        required:[true,'please provide details'],
        minlength:6,
        
    }, 
    status:{
        type:String,
        enum:['aproved', 'pending'],
        default:'pending'  
    }, 
    post_id:{
        type:mongoose.Types.ObjectId,
        ref:'Post',
        required:[true,'Please provide post id']
        
    },
})



module.exports = mongoose.model('Comment', CommentSchema )