const express=require("express");
const router=express.Router();
const {isAuthenticated}=require('../Middleware/isAuth');


const {startExam, submitExam } =require ("../controller/exam");

router.get("/:quizName", isAuthenticated, startExam);

router.post("/",isAuthenticated, submitExam);

module.exports= router;