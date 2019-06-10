const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');
const reigster = require('./routes/registration');
const login = require('./routes/loginauth');
const transaction = require('./routes/transactions');
const app = express();


if(!config.get('jwtPrivateKey')){
        console.log("FATEL ERROR: jwtPrivateKey is not defined");
        process.exit(1);
}


mongoose.connect('mongodb://localhost/paytmclone')
        .then(()=>{console.log('connected to monogdb');})
        .catch((err)=>{console.log('something went wrong', err);});
app.use(express.json());
app.use(cors());
app.use(reigster);
app.use(login);
app.use(transaction);
const port = process.env.Port || 8000;
app.listen(port);
console.log(`listening to the port ${port}`);