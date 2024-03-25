import express from "express";
import docrouter from "../docs/Docs";
import userRoute from "./users.routes";
import categoryRoute from "./category.routes";


const router = express.Router();

// Routes


router.use("/docs", docrouter);
router.use("/users", userRoute)
router.use("/categories", categoryRoute);



export default router;
