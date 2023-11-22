const { registerUser,loginUser } = require('../controller/auth');
const user=require('../models/user') 
const express=require("express");
const router=express.Router();


/* paths-->
/auth/userLogin
/auth/userRegister
/auth/adminLogin
/auth/adminRegister */


router.post('/login',loginUser);


router.post('/register',registerUser)

module.exports=router;
