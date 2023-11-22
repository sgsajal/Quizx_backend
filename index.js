const userRoute=require("./routes/user");
const authRoute=require('./routes/auth');
const quizRoute= require("./routes/quiz");
const examRoute = require("./routes/exam");
const reportRoute =require ("./routes/report");


const express=require("express");
const mongoose=require('mongoose');
const cors =require("cors");
const app=express();

//Connection to the Database
app.use(express.json());
app.use(cors());
mongoose.set("strictQuery",true);
mongoose.connect("mongodb://127.0.0.1:27017/employee");
var db=mongoose.connection;
db.on("open",()=>console.log("Connected to DB"));
db.on("error",()=>console.log("Error Occurred"));


app.use('/user',userRoute);
app.use('/auth',authRoute);
app.use('/quiz',quizRoute);
app.use("/exam", examRoute);
app.use("/report", reportRoute);



app.use(
    (err, req, res, next) => {
      // email to corresponding email
      // logger for err
      let message;
      let statusCode;
  
      if (!!err.statusCode && err.statusCode < 500) {
        message = err.message;
        statusCode = err.statusCode;
      } else {
        message = "Something went wrong please try after sometime!";
        statusCode = 500;
      }
  
      let resp = { status: "error", message, data: {} };
      if (!!err.data) {
        resp.data = err.data;
      }
  
      console.log(err.statusCode, err.message);
      res.status(statusCode).send(resp);
    }
  );

app.listen(4000,()=>{
    console.log("Server started at 4000");
})