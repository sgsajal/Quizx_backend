const bcrypt =require("bcryptjs");
const mongoose=require('mongoose');
const jwt =require("jsonwebtoken");
// import ProjectError from "../helper/error";
const User =require("../models/user");
// import { startExam } from './exam';

const registerUser = async (req, res, next) => {
    let resp;
    try {
      const email = req.body.email;
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
      let password = await bcrypt.hash(req.body.password, 12);

  
      const user = new User({ email, firstname,lastname, password });
      const result = await user.save();
        resp = {
          status: "success",
          message: "Registration done!",
          data: { userId: result._id },
        };
        res.status(201).send(resp);
    } catch (error) {
      resp = { status: "error", message: "User Already Registered", data: {} };
        console.log(resp)
        res.status(404).send(resp);
    }
  };


const loginUser = async (req, res, next) => {
    let resp
    try {
      const email = req.body.email;
      const password = req.body.password;
      //find user with email
      const user = await User.findOne({ email });
      if (!user) {
        const err = new Error("No user exist");
        err.statusCode = 401;
        throw err;
      }
      //verify password using bcrypt
      const status = await bcrypt.compare(password, user.password);
      if (!status) {
        const err = new Error("Incorrect Password");
        err.statusCode = 401;
        throw err;
      }
      if (status) {
        const token = jwt.sign({ userId: user._id }, 'secretKey', {
          expiresIn: "10h",
        });
        const userid=user._id;
        const username=user.firstname;
        await user?.save();
        resp = { status: "success", message: "Logged in", data: { token,userid,username } };
        res.status(200).send(resp);
      }
    } catch (error) {
      next(error);
    }
  };

  module.exports={registerUser,loginUser};