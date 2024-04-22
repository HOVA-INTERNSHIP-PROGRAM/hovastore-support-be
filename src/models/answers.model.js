import mongoose from "mongoose";
const answerSchema = new mongoose.Schema({
    title: {
        type:String,
        require: true,
    },
    image: [{
        type: String,
    }],
    description: {
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