import express from "express";
import { getReplies, getReply, createReply, deleteReply, updateReply } from "../controllers/reply.controller";
import Auth from "../middleware/auth";
import fileUpload from "../helper/multer";

const replyRoute = express.Router();

replyRoute.get('/', getReplies);
replyRoute.get('/:id', getReply);
replyRoute.post('/:feedbackId/feedback', fileUpload.single("files"), Auth, createReply);
replyRoute.put('/:id', fileUpload.single("files"), Auth, updateReply)
replyRoute.delete('/:id', Auth, deleteReply);

export default replyRoute;