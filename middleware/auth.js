const jwt = require('jwt')
const User = require("../model/users")

exports.protect = async (req,res,next)=>{
    let token;
if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    token = req.headers.authorization.split("")[1]

}

if(!token){
            res.status(400).json({
        success:false,
        error:"Not Authorized"
    })
}
try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne(decode.id)
  req.user = user
  next()
} catch (error) {
    
}
}