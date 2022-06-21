const jwt = require('jsonwebtoken');
function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]  
    console.log(token)
    if(token ==null){
    return res.status(401).send("Invalid Token")
}
jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{

    if (err) {
        res.status(403).send()
    }
    req.user = user
    next();

})
}

module.exports = authenticateToken;