import express from "express";
import fileUpload from "../helper/multer";
import Auth from "../middleware/auth";
import { 
    createAQuestion,
    updateAQuestion,
    viewAll,
    viewOneQuestion,
    deleteQuestion,
 } from "../controllers/question.controller";

 const questionRoute = express.Router();
 questionRoute.post("/:categoryId/category",Auth,fileUpload.single("question"),createAQuestion);
 questionRoute.get("/",viewAll);
 questionRoute.get("/:questionId", viewOneQuestion);
 questionRoute.put("/:questionId",Auth,fileUpload.single("question"),updateAQuestion);
 questionRoute.delete("/:questionId",Auth,fileUpload.single("question"),deleteQuestion);

 export default questionRoute;