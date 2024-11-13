const express = require('express')
const router = express.Router()
const {signup,signIn,verifyotp,resendOtp,refreshtoken,googleauth} = require("../controllers/userControllers")
router.post("/signup",signup)
router.post("/signin",signIn)
router.post("/verify_otp",verifyotp)
router.post("/resend_otp",resendOtp)
router.post("/refresh_token",refreshtoken)
router.post("/auth/google",googleauth)



module.exports = router
