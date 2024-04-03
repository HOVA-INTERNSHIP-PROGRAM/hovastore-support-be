import mongoose from "mongoose";
const answerSchema = new mongoose.Schema({
    step: {
        type:String,
        require: true,
    },
    stepImage: [{
        type: String,
    }],
    stepDescription: {
        type:String,
        require: false,
    },
    questionId: {
        type: mongoose.Schema.ObjectId, ref:"questions",
    },
    userId:{
        type: mongoose.Schema.ObjectId, ref:"users",
      },
},{ timestamps: true });

const Answers = mongoose.model("answers", answerSchema);
export default Answers;