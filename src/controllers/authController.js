const { restart } = require('nodemon');
const UserDAO = require("../dao/userDao");
const {_isValidLogin} = require('../helpers/index');
const { exist, isRef } = require('@hapi/joi');
const isRefreshToken = require('../middlewares/isRefreshToken');
const jwt = require("jsonwebtoken");
const TokenModel = require("../models/Token");
const Joi = require('@hapi/joi');
const crypto = require("crypto");
const sendEmail = require("../utils/sendMail");

module.exports.signup = function (req, res){
    const userObj = req.body
    if((!userObj.email) && (!userObj.password)){
        return res.status(202).send({success: false, error: "Solicitud incorrecta, validar el json"});
    }
    
    try{
        UserDAO.create(userObj)
            .then((user) => {
                res.status(200).send({success: true, message: user});
            }).catch(error => res.status(202).send({success: false, error: error.message}))
    }
    catch(error){
        res.status(500).send({success: false, error: error.message});
    }
}

module.exports.login = function(req, res){
    if(!req.body.email || !req.body.password){
        return res.status(400).send({success: false, error: "Favor, la informacion del usuario es requerida."});
    }
    const { error } = _isValidLogin(req.body);
    if (error) {
        res.status(401).send({success: false, error: error.message})
    }
    
    try{
        UserDAO.login(req.body)
            .then(data => {
                res.status(200).send({success: true, data});
            }).catch(error => res.status(403).send({success: false, error: error.message}))
    }catch(error){
        res.status(402).send({success: false, error: error.message})
    }    
}

module.exports.loginGoogle = function(req, res){
    if(!req.body.email || !req.body.password){
        return res.status(400).send({success: false, error: "Favor, la informacion del usuario es requerida."});
    }
    const { error } = _isValidLogin(req.body);
    if (error) {
        res.status(401).send({success: false, error: error.message})
    }
    
    try{
        UserDAO.login(req.body)
            .then(data => {
                res.status(200).send({success: true, data});
            }).catch(error => res.status(403).send({success: false, error: error.message}))
    }catch(error){
        res.status(402).send({success: false, error: error.message})
    }    
}

module.exports.refreshToken = function(req, res){
    const user = isRefreshToken(req,res)
    const userObject = {
        _id: user._id,
        email: user.email,
        role: user.role,
    }
    console.log(userObject)
    let auth = {}
    auth.accessToken = jwt.sign(Object.assign({},userObject),process.env.TOKEN_SECRET,{
                  //El token posee una duración de 15 minutos.
        expiresIn: "8h"
    }),
    auth.refreshtoken =  jwt.sign(Object.assign({},userObject),process.env.RTOKEN_SECRET,{expiresIn: "9h"})
    return res.status(200).send({success: true, tokens: auth});
}

module.exports.sendPasswordReset =  async (req, res) => {
    try {
        const schema = Joi.object({ email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await UserDAO.findUserByEmail(req.body.email );
        if (!user)
            return res.status(400).send("user with given email doesn't exist");

        let token = await TokenModel.findOne({ userId: user._id });
        if (!token) {
            token = await new TokenModel({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
        await sendEmail(user.email, "Password reset", link);

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
};

module.exports.PasswordReset = async (req, res) => {
    try {
        const schema = Joi.object({ password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await UserDAO.findUserById(req.params.userId);
        if (!user) return res.status(400).send("invalid link or expired");

        const token = await TokenModel.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired");

        user.password = req.body.password;
        await user.save();
        await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
};