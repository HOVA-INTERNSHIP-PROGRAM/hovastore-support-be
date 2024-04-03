import express from "express";
import { createAnswer, getAllAnswers, deleteAnswer, updateAnswer } from "../controllers/answer.controller";
import fileUpload from "../helper/multer";
import Auth from "../middleware/auth";

const answerRoute = express.Router();

answerRoute.get("/", getAllAnswers);
answerRoute.post("/:questionId", fileUpload.single("stepImage"), Auth,createAnswer);
answerRoute.put("/:answerId", fileUpload.single("stepImage"), Auth, updateAnswer);
answerRoute.delete("/:answerId", fileUpload.single("stepImage"), Auth, deleteAnswer);

export default answerRoute;