const User = require("../model/users")

module.exports.registerUser= async(req,res)=>{
try{
const {firstName,surName,userName,email,phone,password} = req.body
const user = await User.create({
    firstName,surName,userName,email,phone,password
})

const userEmailExist = await User.findOne({email})
if(userEmailExist){
   res.status(500).json({
        success:false,
        error:"Email address already exists"
    })
}else{
   res.status(201).json({
        success:true,
        user:user,
        token:sendToken()
    })
}

}catch(error){
    res.status(500).json({
        success:false,
        error:error.message
    })
}

}


module.exports.loginUser = async() =>{
    try {
        const {email,password} = req.body
        if(!email || !password){
             res.status(400).json({
        success:false,
        error:"Please provide email and password"
    })

    // const user = await User.findOne({email}).select("+password")
    // if(!user){
    //     res.status(404).json({
    //         success:false,
    //     error:"invalid credentials"
    //     })
    // }
const isMatch = await user.matchPasswords(password)
if(!isMatch){
        res.status(404).json({
            success:false,
        error:"invalid credentials"
        })
} else{
        res.status(201).json({
            success:true,
        token:sendToken()
        })
}

}
    } catch (error) {
          res.status(500).json({
        success:false,
        error:error.message
    })  
    }
}

function sendToken(){
    const token = user.getSignedToken()
    return token
}