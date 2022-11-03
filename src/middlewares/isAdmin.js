const jwt = require("jsonwebtoken");

function isAdmin(req, res, next){
    const access_token = req.headers['authorization'];
    if(!access_token) return res.status(403).send({ success: false, message: 'Acceso denegado'})

    const user = _decodedToken(access_token);
    if(!user) return res.status(403).send({ success: false, message: 'Acceso denegado'})
    if (user.role !== 'Admin') {
        return res.status(403).send({ success: false, message: 'Acceso denegado'})
    }
    else{
        req.user = user;
        next();
    }
    
}


function _decodedToken(token){
    
    try{
        var user = jwt.verify(token,process.env.TOKEN_SECRET);
        console.log(user)
    }catch(error){
        console.log(error.message);
    }

    return user;

}
module.exports = isAdmin;