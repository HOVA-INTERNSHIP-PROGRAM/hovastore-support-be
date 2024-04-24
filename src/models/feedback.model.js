import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    names: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    feedback: {
        type: String,
        required: true,
    },
    question: {
        type: mongoose.Schema.ObjectId,
        ref: "questions",
    },
    replies: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "reply",
        },
    ],
},
{
    timestamps: true,
}
);

const Feedback = mongoose.model('feedback', feedbackSchema);
export default Feedback;