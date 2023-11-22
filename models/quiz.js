const mongoose =require ("mongoose");

const schema = mongoose.Schema;
//schema
const quizSchema = new schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required:true,
    },
    questionList: [
      {
        question: String,
        options:[String],
        answer: Number,
      },
    ],
    
    created_By: {
      type: mongoose.Types.ObjectId,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports= Quiz;