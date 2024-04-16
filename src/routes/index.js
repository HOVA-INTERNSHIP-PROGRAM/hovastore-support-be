import express from "express";
import docrouter from "../docs/Docs";
import userRoute from "./users.routes";
import categoryRoute from "./category.routes";
import questionRoute from "./question.routes";
import answerRoute from "./answer.routes";
import feedbackRouter from "./feedback.routes";

const router = express.Router();

// Route


router.use("/docs", docrouter);
router.use("/users", userRoute)
router.use("/categories", categoryRoute);
router.use("/questions", questionRoute);
router.use("/answers", answerRoute);
router.use("/feedbacks", feedbackRouter);



export default router;
