const Quiz = require("../models/quiz");
const Report = require("../models/report");
const User = require("../models/user");
const { Mongoose }=require("mongoose");

const startExam = async (req, res, next) => {
  try {
    const quizName = req.params.quizName;
    // console.log(quizName);
    const quiz = await Quiz.findOne({name:quizName}, {
      name: 1,
      questionList: 1,
    });
    // console.log(quiz);
    if (!quiz) {
      const err = new Error("No quiz found!");
      err.statusCode = 404;
      throw err;
    }
    const resp = {
      status: "success",
      message: "Quiz",
      data: quiz,
    };
    res.status(200).send(resp);
  } catch (error) {
    next(error);
  }
};

const submitExam = async (req, res, next) => {
  try {
    const quizName = req.body.quizName;
    const score= req.body.score;
    const userId = req.userId;

    const user=await User.findById(userId,{firstname:1,lastname:1});
    const quiz = await Quiz.findOne({quizName:quizName}, { name: 1,questionList:1});
    if (!quiz) {
      const err = new ProjectError("No quiz found!");
      err.statusCode = 404;
      throw err;
    }
    const quizId=quiz._id;
    const userName=user.firstname+" "+user.lastname;
    const total = quiz.questionList.length;


    const report = new Report({ userId,userName, quizId,quizName, score, total });
    const data = await report.save();
    const resp = {
      status: "success",
      message: "Quiz submitted",
      data: { total, score, ReportId: data._id },
    };
    console.log(resp);
    res.status(200).send(resp);
  } catch (error) {
    next(error);
  }
};

module.exports={ startExam, submitExam, };