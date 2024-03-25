import mongoose from "mongoose";
const questionSchema = new mongoose.Schema({
    questionPhrase: {
        type:String,
        require: true,
    },
    categoryId: {
        type: mongoose.Schema.ObjectId, ref:"category",
    },
    answers: [{
        type: mongoose.Schema.ObjectId, ref:"answers",
    }],
},{ timestamps: true });

const Questions = mongoose.model("questions", questionSchema);
export default Questions;