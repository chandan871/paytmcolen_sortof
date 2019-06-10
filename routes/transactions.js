const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();
const Users = require('../models/users_model');
const Transaction = require('../models/userpayments_model')
const validateUser = require('../joivalidator/uservalidaton');
const auth = require('../middleware/auth');
app.use(express.json()); 

app.put('/user/addmoney', auth, async (req, res)=>{
    if(req.body.amount<1){
        res.status(400).send("Enter valid amount");
    }
    else{

    }
    const singleresult = await Users.findOne({Contact:req.body.Contact});
    console.log(singleresult);
    if(!singleresult) return;
    const oldamount =  singleresult.balance;

    singleresult.balance = req.body.amount+oldamount;

    try{ 
 const updateuser = await singleresult.save(); 
 res.send({'UserresponseBeanlist': updateuser, 'Success' :'true'});
    }
    catch(err){
     res.send({'UserresponseBeanlist': "[]", 'Success' :'false'});
    }
 })
app.put('/user/sendmoney', auth, async (req, res)=>{
    if(req.body.amount<1){
        res.status(400).send("Enter valid amount");
    }
    
    else{
    
    const sender = await Users.findOne({Contact:req.body.sendercontact});
    const reciever = await Users.findOne({Contact:req.body.recievercontact});
    console.log(sender);
    if(!sender) return res.send("Enter valid sender contact");
    if(!reciever) return res.send("Reciever not found");
    if(sender.amount < req.body.amount) return res.status(400).send("Insuficient balance");
    
    reciever.balance = req.body.amount+reciever.balance;


    sender.balance = sender.balance-req.body.amount;
    try{ // handling promise for the error scenario
 const updateruser = await reciever.save(); //handling promise only for the success scenario
 const updatesuser = await sender.save(); //handling promise only for the success scenario
 res.send({'UserresponseBeanlist': updateruser, 'Success' :'true'});
    }
    catch(err){
     res.send({'UserresponseBeanlist': "[]", 'Success' :'false'});
    }


    let transactionr = await Transaction.findOne({Contact:req.body.recievercontact});
    let transactions = await Transaction.findOne({Contact:req.body.sendercontact});
    if(!transactions){
    let allnewstrans = [];
    allnewstrans.push([{'transferredto': req.body.recievercontact},
    {'recievedfrom':''},
    {'transferedamount':req.body.amount},{'Handlingtime': new Date()}]);
    const transactionsend = new Transaction({
            
        Contact:req.body.sendercontact,
        /* transferredto:req.body.recievercontact,
        recievedfrom:'',
        transferedamount:req.body.amount */
        usertransactions:allnewstrans
    })
    const senderresult = await transactionsend.save();
}

if(!transactionr){
    let allnewrtransc = [];
    allnewrtransc.push([{'transferredto':''},
    {'recievedfrom':req.body.recievercontact},
    {'transferedamount':req.body.amount}, {'Handlingtime': new Date()}])
    const transactionsend = new Transaction({
            
        Contact:req.body.recievercontact,
        usertransactions:allnewrtransc
    })
    const recieverresult = await transactionsend.save();
}
try{
let allsendert = [];
allsendert.push({'transferredto': req.body.recievercontact},
{'transferedamount':req.body.amount}, {'Handlingtime': new Date()})
transactions.usertransactions.push(allsendert);
const sendertr = await transactions.save();

let allrecietrans = [];
allrecietrans.push(
{'recievedfrom':req.body.recievercontact},
{'transferedamount':req.body.amount},{'Handlingtime': new Date()});
transactionr.usertransactions.push(allrecietrans);
const recievertr = await transactionr.save();
}
catch(err){
    console.log('first time added', err);
}

}
 })


 app.get('/users/alltransactions/:mobnumber', auth, async (req,res)=>{
     console.log(req.params.mobnumber);
    const transactionlist  = await Transaction.findOne({Contact: req.params.mobnumber});
     res.status(200).send({'UserResponseBeanList':transactionlist, 'Success':'true'});
     //console.log(transactionlist)
 })
 
 app.get('/users/allusers/:userrole', auth, async (req,res)=>{
     if(req.params.userrole !='admin') return res.status(402).send("Access Denied");
    const alluserlist  = await Users.find({UserType:'customer'});
     res.status(200).send({'UserResponseBeanList':alluserlist, 'Success':'true'});
     //console.log(transactionlist)
 })










module.exports = app;
