import express from "express";
import docrouter from "../docs/Docs";
import userRoute from "./users.routes";


const router = express.Router();

// Routes


router.use("/docs", docrouter);
router.use("/users", userRoute)


export default router;
