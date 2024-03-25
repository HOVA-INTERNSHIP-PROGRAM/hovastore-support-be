import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    questions: [{
      type: mongoose.Schema.ObjectId, ref:"questions",
    }],
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.models.category || mongoose.model('category', categorySchema);

export default Category;