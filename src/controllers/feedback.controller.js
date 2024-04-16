import * as feedbackService from "../services/feedback.services.js";
import { validateCreateFeedback } from "../validation/feedback.validation.js";

// a controller to retrieve all feedbacks
export const getFeedbacks = async (req, res) =>{
    try{
        const feedbacks = await feedbackService.getFeedbacks();
        return res.status(200).json({
            status: "200",
            message: "All feedbacks are retrieved",
            data: feedbacks,
        });
    } catch(error){
        return res.status(500).json({
            status: "500",
            message: "Failed to retrieve feedbacks",
            error: error.message,
        });
    }    
};

// a controller to retrieve a single feedback
export const getFeedback = async (req, res) => {
    const { id } = req.params;
    try{
        const feedback = await feedbackService.getFeedback(id);
        return res.status(200).json({
            status: "200",
            message: "Single Feedback is retrieved",
            data: feedback,
        });
    } catch(error){
        return res.status(500).json({
            status: "500",
            message: "Failed to retrieve a single feedback",
            error: error.message,
        });
    }

};

// a controller to create a feedback
export const createFeedback = async (req, res) => {
    const { error, value } = validateCreateFeedback(req.body);
    if(error){
        return res.status(400).json({
            message: error.details[0].message,
        });
    }
    try {
        const { names, email, feedback } = value;
        const createdFeedback = await feedbackService.createFeedback({
            names,
            email,
            feedback,
        });
        return res.status(201).json({
            status: "201",
            message: "Feedback created",
            data: createdFeedback,
        });
    } catch (error) {
        return res.status(500).json({
            status: "500",
            message: "Failed to create feedback",
            error: error.message,
        });
    }
};

// a controller to delete a feedback
export const deleteFeedback = async (req, res) => {
    const { id } = req.params;
    try {
        await feedbackService.deleteFeedback(id);
        return res.status(200).json({
            status: "200",
            message: "Feedback deleted",
        });
    } catch (error) {
        return res.status(500).json({
            status: "500",
            message: "Failed to delete a feedback",
            error: error.message,
        });
    }
};