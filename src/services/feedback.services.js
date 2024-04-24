import Feedback from "../models/feedback.model";
import Questions from "../models/question.models";
// a service to retrieve all feedbacks
export const getFeedbacks = async () => {
    return await Feedback.find().populate({
        path: "question", 
        select: "question"
    }).populate({
        path: "replies",
        select: "message"
    });
};

// a service to retrive a single feedback
export const getFeedback = async (id) => {
    const feedback = await Feedback.findById(id);
    if(!feedback){
        throw new Error("Feedback not found");
    }
    return await Feedback.findById(id).populate({
        path: "question", 
        select: "question"
    }).populate({
        path: "replies",
        select: "message"
    });;
};

// a service to create a feedback
export const createFeedback = async (names, email, feedback, questionId) => {
    const question = await Questions.findById(questionId);
    if(!question){
        throw new Error("Question not found");
    }
    const createdFeedback = await Feedback.create({names, email, feedback, question: questionId});
    await Questions.findByIdAndUpdate(questionId,
        {$push: {'feedbacks': createdFeedback._id}},
        {new: true}
    );

    return createdFeedback;
};

// a service to delete a feedback
export const deleteFeedback = async (id) => {
    const feedback = await Feedback.findById(id);
    if(!feedback){
        throw new Error("Feedback not found");
    }
    return await Feedback.findByIdAndDelete(id);
};