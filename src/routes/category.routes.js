import express from "express";
import { createCategory, getCategories, getOneCategory, updateCategory, deleteCategory } from "../controllers/category.controller";
import fileUpload from "../helper/multer";
import Auth from "../middleware/auth";

const categoryRoute = express.Router();


categoryRoute.get("/", getCategories);
categoryRoute.get("/:id", getOneCategory);
categoryRoute.post("/", fileUpload.single("icon"), Auth,createCategory);
categoryRoute.put("/:id", fileUpload.single("icon"), Auth, updateCategory);
categoryRoute.delete("/:id", fileUpload.single("icon"), Auth, deleteCategory);

export default categoryRoute;