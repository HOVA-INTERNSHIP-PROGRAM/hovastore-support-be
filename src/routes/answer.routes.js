import express from "express";
import {
  createAnswer,
  getAllAnswers,
  deleteAnswer,
  updateAnswer,
} from "../controllers/answer.controller";
import fileUpload from "../helper/multer";
import Auth from "../middleware/auth";

const answerRoute = express.Router();

answerRoute.get("/", getAllAnswers);
answerRoute.post(
  "/:questionId/question",
  fileUpload.single("image"),
  Auth,
  createAnswer
);
answerRoute.put("/:answerId", fileUpload.single("image"), Auth, updateAnswer);
answerRoute.delete(
  "/:answerId",
  fileUpload.single("image"),
  Auth,
  deleteAnswer
);

export default answerRoute;
