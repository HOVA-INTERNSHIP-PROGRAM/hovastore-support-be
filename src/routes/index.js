import express from "express";
import docrouter from "../docs/Docs";
import userRoute from "./users.routes";
import categoryRoute from "./category.routes";
import articleRoute from "./article.routes";
import questionRoute from "./question.routes";
import answerRoute from "./answer.routes";
import feedbackRouter from "./feedback.routes";
import replyRoute from "./Reply.routes";

const router = express.Router();

// Route

router.use("/docs", docrouter);
router.use("/users", userRoute);
router.use("/categories", categoryRoute);
router.use("/articles", articleRoute);
router.use("/questions", questionRoute);
router.use("/answers", answerRoute);
router.use("/feedbacks", feedbackRouter);
router.use('/replies', replyRoute)

export default router;
