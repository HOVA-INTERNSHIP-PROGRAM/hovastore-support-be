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
 questionRoute.post("/:id",Auth,fileUpload.single("question"),createAQuestion);
 questionRoute.get("/read/:id",viewAll);
 questionRoute.get("/readOne/:id", viewOneQuestion);
 questionRoute.put("/:id",Auth,fileUpload.single("question"),updateAQuestion);
 questionRoute.delete("/:id",Auth,fileUpload.single("question"),deleteQuestion);

 export default questionRoute;