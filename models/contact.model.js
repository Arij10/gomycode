const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({
    name:{type:String, required:true,unique:true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    createdAt:{type:Date, default:new Date()},
    role:{type:String,default:'user'}
})
module.exports = mongoose.model('Contact',contactSchema)