import mongoose from "mongoose";
const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      require: true,
    },
    categoryId: {
      type: mongoose.Schema.ObjectId,
      ref: "category",
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
  },
  { timestamps: true }
);

const Questions = mongoose.model("questions", questionSchema);
export default Questions;
