const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const usersSchema = new mongoose.Schema({
  firstName:{
    type:String,
  },
  surName:{
    type:String,
  },
  userName:{
    type:String,
  },
  email: {
    type: String,
   },
  phone:{
    type:String,
 },
   password:{
    type:String,
}
 
})

usersSchema.pre("save", async function(next){
  if(!this.isModified("password")){
   next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})
usersSchema.methods.matchPasswords = async function(password){
  return await bcrypt.compare(password)
}
usersSchema.methods.getSignedToken= function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE
  })
}
const User = module.exports= mongoose.model('User', usersSchema)
