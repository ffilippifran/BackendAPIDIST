const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next){
    const access_token = req.headers['authorization'];
    if(!access_token) return res.status(400).send({ success: false, message: 'Solicitud incorrecta'})

    const user = _verifyAuthToken(access_token);
    if(user == "jwt expired") return res.status(401).send({ success: false, message: 'Token expirado, vuelva a iniciar sesión para refrescarlo.'})

    if(!user) return res.status(403).send({ success: false, message: 'Acceso denegado'})
    
    req.user = user;
    next();
}


function _verifyAuthToken(token){
    
    try{
        var user = jwt.verify(token,process.env.TOKEN_SECRET);
    }catch(error){
        if(error.message == "jwt expired"){
            user = "jwt expired"
        }
    }

    return user;

}

module.exports = isAuthenticated;