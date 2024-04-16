import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    names: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    feedback: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
}
);

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;