const dotenv = require('dotenv')

const mongoClient = require('mongoose');
mongoClient.connect(process.env.LOCAL,{
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  
 })
.then(()=>{
 console.log("db connected")
}).catch(err=>{
  console.log(err)
  console.log("could not connect")
})

module.exports.mongoClient = mongoClient