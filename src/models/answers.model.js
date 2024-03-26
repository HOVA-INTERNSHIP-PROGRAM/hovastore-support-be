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
},{ timestamps: true });

const Answers = mongoose.model("answers", answerSchema);
export default Answers;