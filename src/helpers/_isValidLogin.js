const Joi = require('@hapi/joi');

function _isValidLogin(userInfo){
    const schemaLogin = Joi.object({
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required()
    })
    
  return (schemaLogin.validate(userInfo));

}
module.exports = _isValidLogin;