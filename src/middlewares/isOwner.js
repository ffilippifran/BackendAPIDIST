const jwt = require("jsonwebtoken");

function isOwner(req, res, next){
    const access_token = req.headers.Authorization;
    if(!access_token) return res.status(403).send({ success: false, message: 'Acceso denegado'})

    const user = _decodedToken(access_token);
    if(!user) return res.status(403).send({ success: false, message: 'Acceso denegado'})
    if (user.role !== 'Owner') {
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
        
    }catch(error){
        console.log(error.message);
    }

    return user;

}
module.exports = isOwner;