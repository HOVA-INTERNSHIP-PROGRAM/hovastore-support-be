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
 questionRoute.post("/:id",fileUpload.single("question"),createAQuestion);
 questionRoute.get("/read/:id",viewAll);
 questionRoute.get("/readOne/:id", viewOneQuestion);
 questionRoute.put("/:id",fileUpload.single("question"),updateAQuestion);
 questionRoute.delete("/:id",fileUpload.single("question"),deleteQuestion);

 export default questionRoute;