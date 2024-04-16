import express from "express";
import { getFeedbacks, getFeedback, createFeedback, deleteFeedback } from "../controllers/feedback.controller";
import fileUpload from "../helper/multer";
import Auth from "../middleware/auth"

const feedbackRouter = express.Router();

feedbackRouter.get('/', Auth, getFeedbacks);
feedbackRouter.get('/:id', Auth, getFeedback);
feedbackRouter.post('/', fileUpload.single('files'), createFeedback);
feedbackRouter.delete('/:id', Auth, deleteFeedback);

export default feedbackRouter;