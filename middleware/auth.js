const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Unauthorized User, Access Denied');

        try{
    const decodedtoken = jwt.verify(token, config.get('jwtPrivateKey'));
    req.decodedtoken = decodedtoken;
    console.log(decodedtoken);
    next();
            }
            catch(err){
                res.status(401).send('Invalid Token');
            }
}