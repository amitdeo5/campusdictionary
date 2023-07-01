const mongoose =require('mongoose');
// const { schema } = require('./user');

const tokenSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users",
        unique:true,
    },
    token:{type:String,required:true},
    createdAt:{type:Date,default:Date.now(),expires:3600}
});

const tokenModel = mongoose.model('token',tokenSchema)
module.exports = tokenModel;