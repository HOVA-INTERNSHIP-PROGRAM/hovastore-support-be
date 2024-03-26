import express from "express";
import { createCategory, getCategories, getOneCategory, updateCategory, deleteCategory } from "../controllers/category.controller";
import fileUpload from "../helper/multer";
import Auth from "../middleware/auth";

const categoryRoute = express.Router();


categoryRoute.get("/", getCategories);
categoryRoute.get("/:id", getOneCategory);
categoryRoute.post("/", fileUpload.single("files"), Auth,createCategory);
categoryRoute.put("/:id", fileUpload.single("files"), Auth, updateCategory);
categoryRoute.delete("/:id", fileUpload.single("files"), Auth, deleteCategory);

export default categoryRoute;