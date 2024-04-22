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
    icon: {
      type: String,
    },
    userId:{
      type: mongoose.Schema.ObjectId, ref:"users",
    },
    articles: [{
      type: mongoose.Schema.ObjectId, ref:"articles",
    }],
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.models.category || mongoose.model('category', categorySchema);

export default Category;