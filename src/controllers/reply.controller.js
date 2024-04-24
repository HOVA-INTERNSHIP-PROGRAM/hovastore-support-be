import * as ReplyService from "../services/reply.services";
import { ValidateAddReply, ValidateUpdateReply } from "../validation/reply.validation";

// controller to retrieve all replies
export const getReplies = async (req, res) => {
    try {        
        const replies = await ReplyService.getReplies()
        return res.status(200).json({
            status: "200",
            message: "All Replies are retrieved",
            data: replies,
        });
    } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Failed to retrive all replies",
            error: error.message,
        });
    }
};

// controller to retrieve a single reply
export const getReply = async (req, res) => {
    try {
        const { id } = req.params;
        const reply = await ReplyService.getReply(id);
        return res.status(200).json({
            status: "200",
            message: "Single Reply retrieved successfullyu",
            data: reply,
        })
    } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Failed to retrieve single reply",
            error: error.message,
        });
    }
};

// controller to create a reply
export const createReply = async (req, res) => {
    const { error, value } = ValidateAddReply(req.body);
    if (error) {
        return res.status(400).json({
        message: error.details[0].message,
        });
    }
    try {
        const { feedbackId } = req.params;
        const userId = req.User._id;
         const { message } = value;
        
        const reply = await ReplyService.createReply(message, userId , feedbackId);
        return res.status(201).json({
         status: "201",
         message: "Reply created",
         data: reply,
        });        
    } catch (error) {
        return res.status(500).json({
         status: "500",
         message: "Failed to create a Reply",
         error: error.message,
        });                
    }
};

// controller to delete reply
export const updateReply = async (req, res) => {
    const { error, value } = ValidateUpdateReply(req.body);
    if (error) {
        return res.status(400).json({
        message: error.details[0].message,
        });
    }
    try {
        const { id } = req.params;
        const { message } = value;
        await ReplyService.updateReply(id, message);
        return res.status(200).json({
            status: "200",
            message: "Reply updated",
        });
    } catch (error) {
        return res.status(500).json({
            status: "500",
            message: "Failed to update a Reply",
            error: error.message,
        });
    }
};

// controller to delete reply
export const deleteReply = async (req, res) => {
    try {
        const { id } = req.params;
        await ReplyService.deleteReply(id);
        return res.status(200).json({
            status: "200",
            message: "Reply deleted",
        });
    } catch (error) {
        return res.status(500).json({
            status: "500",
            message: "Failed to delete a Reply",
            error: error.message,
        });
    }
};