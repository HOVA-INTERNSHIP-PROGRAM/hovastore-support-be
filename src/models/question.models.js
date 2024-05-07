import mongoose from "mongoose";
const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      require: true,
    },
    articleId: {
      type: mongoose.Schema.ObjectId,
      ref: "articles",
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
    },
    answers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "answers",
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
    disLikes: {
      type: Number,
      default: 0,
    },
    feedbacks: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Feedback",
      }
    ]
  },
  { timestamps: true }
);

const Questions = mongoose.model("questions", questionSchema);
export default Questions;
