const mongoose = require('mongoose')
const userSchema = mongoose.Schema({fullname:String,password:String,email_or_phono:String,role:String,verify:Boolean})
const usermodel = mongoose.model('user',userSchema)
module.exports = usermodel