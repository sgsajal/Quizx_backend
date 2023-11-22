const {getQuiz,getCategoryQuiz,getAllQuiz,createQuiz}=require("../controller/quiz");
const express=require("express");
const router=express.Router();
const {isAuthenticated}=require('../Middleware/isAuth');


router.post("/",isAuthenticated,createQuiz);

// router.get("/:quizId",isAuthenticated, getQuiz);
router.get("/:category",isAuthenticated, getCategoryQuiz);
router.get("/",isAuthenticated, getAllQuiz);

module.exports=router;