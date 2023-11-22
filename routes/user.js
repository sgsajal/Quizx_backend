//Redirect Req to particular controller
const {getUser,updateUser}=require("../controller/user");
const express=require("express");
const router=express.Router();
const {isAuthenticated}=require('../Middleware/isAuth');

//GET :/:user


router.get('/:userId', isAuthenticated, getUser);

// User should be authenticate
// User should be authorize
//Put /user/
router.put('/', isAuthenticated, updateUser);

module.exports = router;