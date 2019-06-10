const mongoose = require('mongoose');

//creating schemas
const Users = new mongoose.Schema({
    // mongoose validator
    Email:{type : String, unique : true, required:true, minlength:8, maxlength:200},
    Contact:{type:Number, minlength:10, maxlength:12},
    Password:{type : String, required:true, minlength:8, maxlength:500},
    ConfirmPassword:{type : String, required:true, minlength:8, maxlength:25},
    UserType:{type:String},
    UserCode:{type:String},
    CreatedAt:{type:Date, default:Date.now},
    balance:{type:Number},
    isActive:Boolean
    });




    //creating monggose model
  
    
    module.exports = mongoose.model('Users', Users);