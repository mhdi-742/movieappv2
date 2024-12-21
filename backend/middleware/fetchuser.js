const jwt=require('jsonwebtoken');
const jwt_sec="hellomehediharea@7427778";
const fetchuser =(req,res,next)=>{
    const token=req.header("token");
    if(!token){
      res.status(401).send({error: "Please authenticate using a valid token"});
    }
    try {
    const decoded = jwt.verify(token, jwt_sec);
    req.body.id=decoded.user;
    next();
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
}
module.exports=fetchuser;
