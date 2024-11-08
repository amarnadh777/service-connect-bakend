var mongoose = require('mongoose')
var otpSchema =  mongoose.Schema({email_or_phono:String,otp:String,expire:Date})
var otpModel = mongoose.model('otp',otpSchema)
module.exports = otpModel
 