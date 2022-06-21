const jwt = require('jsonwebtoken');
function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]  
    if(token==null){
    return res.send({Message : "Invalid Token"})
}
jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{

    if (err) {
        res.send(err)
    }
    req.user = user
    next();
})
}
module.exports = authenticateToken;