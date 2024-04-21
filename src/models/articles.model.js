import mongoose from "mongoose";
const articleSchema = new mongoose.Schema(
  {
    title: {
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
    questions: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "questions",
      },
    ],
  },
  { timestamps: true }
);

const Articles = mongoose.model("articles", articleSchema);
export default Articles;
