const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'Please provide title'],
        maxlenght:50
    },
    details:{
        type:String,
        required:[true, 'Please provide post details'],
    },
    post_categories:{
        type:[mongoose.Types.ObjectId],
        ref:'Category',
        required:[true, 'Please provide post categories'],
    },
    status:{
        type:String,
        enum:['posted', 'pending'],
        default:'pending',
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide post author']
    }
}, {timestamps:true})

module.exports = mongoose.model('Post', PostSchema )