const { ref } = require("@hapi/joi");
const jwt = require("jsonwebtoken");

function isRefreshToken(req,res){
    const refreshToken = req.headers.refreshtoken
    if(!refreshToken) return res.status(400).send({ success: false, message: 'Solicitud incorrecta'})

    const user = _verifyAuthToken(refreshToken);
    if(user != "jwt expired"){return user}
    else return res.status(401).send({ success: false, message: 'Refresh token expirado'})
}


function _verifyAuthToken(token){
    
    try{
        var user = jwt.verify(token,process.env.RTOKEN_SECRET);
    }catch(error){
        if(error.message == "jwt expired"){
            user = "jwt expired"
        }
    }

    return user;

}

module.exports = isRefreshToken;