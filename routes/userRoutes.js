const express = require('express')
const router = express.Router()
const {signup,signIn,verifyotp,resendOtp} = require("../controllers/userControllers")
router.post("/signup",signup)
router.post("/signin",signIn)
router.post("/verify_otp",verifyotp)
router.post("/resend_otp",resendOtp)


module.exports = router
