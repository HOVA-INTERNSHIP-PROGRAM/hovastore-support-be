import Feedback from "../models/feedback.model";

// a service to retrieve all feedbacks
export const getFeedbacks = async () => {
    return await Feedback.find();
};

// a service to retrive a single feedback
export const getFeedback = async (id) => {
    const feedback = await Feedback.findById(id);
    if(!feedback){
        throw new Error("Feedback not found");
    }
    return await Feedback.findById(id);
};

// a service to create a feedback
export const createFeedback = async (data) => {
    return await Feedback.create(data);
};

// a service to delete a feedback
export const deleteFeedback = async (id) => {
    const feedback = await Feedback.findById(id);
    if(!feedback){
        throw new Error("Feedback not found");
    }
    return await Feedback.findByIdAndDelete(id);
};