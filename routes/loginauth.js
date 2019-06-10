const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const config = require('config');
const app = express();
const Users = require('../models/users_model');
app.use(express.json()); 



app.post('/user/login/authentication', async (req, res)=>{
    
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message); 

         let user = await Users.findOne({Email : req.body.Email});
         if(!user) return res.status(400).send("Invalid Email Or Pasword");

         const validpassword = await bcrypt.compare(req.body.Password, user.Password);
         if(!validpassword) return res.status(400).send("Invalid Email Or Password");

         const token = jwt.sign({'id': user.id}, config.get('jwtPrivateKey'));
         
         let userinfo = [];
         userinfo.push({'CreatedAt': user.CreatedAt});
         userinfo.push({'UserCode': user.UserCode});
         userinfo.push({'UserType': user.UserType});
         userinfo.push({'Email': user.Email});
         userinfo.push({'Contact': user.Contact});
         res.header('x-auth-token', token).send({'UserResponseBean': userinfo, 'success': true, 'statusMessage': 'Login Successfull', 'token': token});
         


})

function validate(req) {
    const schema = {
      Email: Joi.string().min(5).max(255).required().email(),
      Password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(req, schema);
  }

module.exports = app;