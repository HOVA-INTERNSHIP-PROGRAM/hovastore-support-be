import mongoose from "mongoose";

const resetTokenSchema = new mongoose.Schema({
    token: {
        type: String,
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
}
);

const Token = mongoose.model('resetToken', resetTokenSchema);
export default Token;