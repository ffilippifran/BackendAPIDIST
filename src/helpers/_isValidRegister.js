const Joi = require('@hapi/joi');

function _isValidRegister(userInfo){
    const schemaRegister = Joi.object({
      firstName: Joi.string().min(3).max(255).required(),
      lastName: Joi.string().min(4).max(255).required(),
      email: Joi.string().min(6).max(255).required().email(),
      password: Joi.string().min(6).max(1024).required()
  })
    
  return (schemaRegister.validate(userInfo));

}
module.exports = _isValidRegister;