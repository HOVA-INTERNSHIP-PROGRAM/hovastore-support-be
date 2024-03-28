import express from "express";
import { createAnswer, getAllAnswers, deleteAnswer, updateAnswer } from "../controllers/answer.controller";
import fileUpload from "../helper/multer";
import Auth from "../middleware/auth";

const answerRoute = express.Router();

answerRoute.get("/:id", getAllAnswers);
answerRoute.post("/:id", fileUpload.single("stepImage"), Auth,createAnswer);
answerRoute.put("/:id", fileUpload.single("stepImage"), Auth, updateAnswer);
answerRoute.delete("/:id", fileUpload.single("stepImage"), Auth, deleteAnswer);

export default answerRoute;