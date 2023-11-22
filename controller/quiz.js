const Quiz = require("../models/quiz");


const createQuiz = async (req, res, next) => {
    try {
      const created_by = req.userId;
      const name = req.body.name;
      const questionList = req.body.questionList;
      const category=req.body.category;
        
      const quiz = new Quiz({ name, questionList,category});
      quiz.created_By=created_by;
      const result = await quiz.save();
      const resp = {
        status: "success",
        message: "Quiz created successfully",
        data: { quizId: result._id,quiz },
      };
      res.status(201).send(resp);
    } catch (error) {
      if(error.code===11000){
      resp = { status: "error", message: "Quiz Name already Registered", data: {} };
        res.status(404).send(resp);}
      else{
        next(error);
      }
    }
  };

const getAllQuiz=async (req, res, next) => {
  try {
    console.log("hello");
    const quiz = await Quiz.find({},{name:1,category:1});
    console.log(quiz);

    if (!quiz) {
      const err = new ProjectError("Quiz not found!");
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


const getQuiz = async (req, res, next) => {
  try {
    const quizId = req.params.quizId;
    console.log(quizId);
    const quiz = await Quiz.findById(quizId, {
      name: 1,
      questionList: 1,
      created_By: 1,
    });

    if (!quiz) {
      const err = new ProjectError("Quiz not found!");
      err.statusCode = 404;
      throw err;
    }

    if (req.userId !== quiz.created_By.toString()) {
      const err = new ProjectError("You are not authorized!");
      err.statusCode = 403;
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

const getCategoryQuiz = async (req, res, next) => {
  try {
    const category = req.params.category;
    console.log(category);
    const quiz = await Quiz.find({category:category}, {
      name: 1,
      category:1,
    });

    if (!quiz) {
      const err = new ProjectError("Quiz not found!");
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

  

  module.exports={createQuiz,getQuiz,getAllQuiz,getCategoryQuiz};
  