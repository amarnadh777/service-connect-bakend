const usermodel = require("../models/userModel");
const otpModel = require("../models/otpModel");
const generateOTP = require("../utils/otpGenerator");
const { FcExpired } = require("react-icons/fc");
const signup = async (req, res) => {
 
  try {
    const { fullname, email_or_phono, password } = req.body;

    if (!fullname | !email_or_phono | !password) {
      return res.json({ message: "all fields required'" });
    }
  
    const userExist = await usermodel.findOne({
      email_or_phono: email_or_phono,
    });
    console.log(userExist)
   if(userExist && userExist.verify)
   {
      return res.json({message:"user already exists"})
   }
   if(userExist)
   {
      const otp = generateOTP();
      const expirationTime = Date.now() + 5 * 60 * 1000;
        const updateUser = await usermodel.findOneAndUpdate({email_or_phono:email_or_phono} , {$set: {email_or_phono:email_or_phono,fullname:fullname,password:password}} )
        const updateOtp = await otpModel.findOneAndUpdate({email_or_phono:email_or_phono},{$set:{otp:otp,expire:expirationTime}})
        console.log("your otp is", otp);
        return res.json({message:"otp sended"})
   }
    const otp = generateOTP();
    const expirationTime = Date.now() + 5 * 60 * 1000;
    
    const newUser = await usermodel({
   fullname: fullname,
      email_or_phono: email_or_phono,
      password: password,
      role: "normal",
      verify: false,
    });
    const newOtp = await otpModel({
      otp: otp,
      email_or_phono: email_or_phono,
      expire: expirationTime,
    });
    newOtp.save();
    newUser.save();
    res.json({ message: "otp sended" });
    console.log("your otp is", otp);
  } catch (error) {
    console.log(error);
  }
};

const signIn = async (req, res) => {
  const { email_or_phono, password } = req.body;

  if (!email_or_phono || !password) {
    return res.json({ message: "enter all fields" });
  }

  const user = await usermodel.findOne({ email_or_phono: email_or_phono });
  
  if (!user.verify) {
    return res.json({ message: "your otp not verified:" });
  }
  if (!user) {
    return res.json({ message: "user not found" });
  }
  if (user.password == password) {
    return res.json({ message: "welcome" });
  }
  return res.json({ message: "your password  is incorrext" });
};

const verifyotp = async (req, res) => {
  try {
    const { otp, email_or_phono } = req.body;
    const isOtp = await otpModel.findOne({
      otp: otp,
      email_or_phono: email_or_phono,
    });
   
    if (isOtp) {
        const dateNow = new Date();
        
        if (dateNow > isOtp.expire) {
          return res.json({ message: "otp is expired" });
        }
      const verify = await usermodel.findOneAndUpdate(
        { email_or_phono: email_or_phono },
      { $set:{ verify: true }}
      );
     return  res.json({ message: "otp verified" });
    } else {
      res.json({ message: "otp is incorrect" });
    }
  } catch (error) {}
};

const resendOtp = async (req, res) => {
 
  
  try {
    const {email_or_phono} = req.body
    if(!email_or_phono)
        {
          return res.json({message:"please enter email"})
        }
    const email_or_phonoExist = otpModel.findOne({email_or_phono:email_or_phono})
    if(!email_or_phonoExist)
    {
        return res.json({message:"email_or_phono is not registered"})

    }
    const otp = generateOTP();
    const expirationTime = Date.now() + 5 * 60 * 1000;
    const resend = await otpModel.findOneAndUpdate({email_or_phono:email_or_phono},{$set:{otp:otp,expire:expirationTime}})
    res.json({message:"otp resended"})
    console.log("your new otp",otp)
  } catch (error) {


  }
};

module.exports = { signup, signIn, verifyotp, resendOtp };
