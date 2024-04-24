import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    feedback: {
        type: mongoose.Schema.ObjectId,
        ref: "feedback",
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
        required: true,
    },
},
{
 timestamps: true,   
});

const Reply = mongoose.model('reply', replySchema);
export default Reply