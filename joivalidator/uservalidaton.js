// validating using JOi
const Joi = require('joi');
function validateUser(user) {
    const schema = {
        Email: Joi.string().min(5).max(255).required().email(),
        Password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        ConfirmPassword: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        Contact: Joi.number().required(),
        UserType:Joi.string(),
        UserCode:Joi.string(),
        CreatedAt:Joi.string(),
        isActive:Joi.string()
    };
  
    return Joi.validate(user, schema);
  }
  module.exports = ('validateUser', validateUser);