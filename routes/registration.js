const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();
const Users = require('../models/users_model');
const validateUser = require('../joivalidator/uservalidaton');
const auth = require('../middleware/auth');
app.use(express.json()); 

        

app.post('/user/registration',async (req, res)=>{
    try{
    const verror = await validateUser(req.body);


    
    if(verror.error!=null){
        res.status(400).send(verror.error.details[0].message);
    }
    else{
        
        let user = await Users.findOne({Email : req.body.Email});
            if(user) return res.status(400).send('User Alrady Registered');
            

        async function createUser(){
        
            
      const user = new Users({
            
            Email: req.body.Email,
            Password: req.body.Password,
            ConfirmPassword: req.body.ConfirmPassword,
            UserType: req.body.UserType,
            UserCode: req.body.UserCode,
            Contact:req.body.Contact,
            CreatedAt: new Date(), //this will set current date 
            isActive: true,
            balance:0
        })
        // save to database;
//hashing password
 
        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(user.Password, salt);
        console.log(user.Password);



        const result = await user.save();
        console.log(result);
        if(result==undefined || result==null || result =={}){
            res.status(500).send({'Success':'false','statusMessage':'Something went wrong'});
        }
        else{
            res.status(200).send({'Success':'true','statusMessage':'You have been registered Successfully'});
        }
        }
        
        createUser();


        
    }
}
catch(err){
    res.status(400).send(err);
    console.log(err);
}
})
//get list of created users

/* app.get('/users/profile',(req,res)=>{
    Users.find({},(err, doc)=>{
        if(err){
            res.status(500).send({'Success':'flase','StatusMessage':err});
        }
        else{
            res.status(200).send({'Success':'true','UserResponseBeanList':doc});
        }
    })
}) */
app.get('/users/profile', auth, async (req,res)=>{
   const userlist  = await Users.find({})
    .limit(5) // limit the number of record 
    .sort({fname: 1}); // sorting based of name 1 means acd and -1 means des order
    //.select({ fname: 1, lname : 1}) // only fetching first and last name 
    //.count(); //to count number of documents 
    res.status(200).send({'UserResponseBeanList':userlist, 'Success':'true'});
    //console.log(userlist)
})

//updating query using query first

app.put('/user/update', auth, async (req, res)=>{
   const singleresult = await Users.findById(req.body.id);
   console.log(singleresult);
   if(!singleresult) return;
   singleresult.fname = 'Kaman';
   singleresult.lname = 'Mhaman';
   try{ // handling promise for the error scenario
const updateuser = await singleresult.save(); //handling promise only for the success scenario
res.send({'UserresponseBeanlist': updateuser, 'Success' :'true'});
   }
   catch(err){
    res.send({'UserresponseBeanlist': "[]", 'Success' :'false'});
   }
})
// delete a document(user)



module.exports = app;
