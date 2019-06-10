
const mongoose = require('mongoose');

//creating schemas
const Transactions = new mongoose.Schema({
    // mongoose validator
    
    Contact:{type:Number, minlength:10, maxlength:12},
    /* transferredto:{type : Number},
    recievedfrom:{type : Number},
    transferedamount:{type:String},
    CreatedAt:{type:Date, default:Date.now} */
    usertransactions:{type:Array}
    });




    //creating monggose model
  
    
    module.exports = mongoose.model('Transactions', Transactions);