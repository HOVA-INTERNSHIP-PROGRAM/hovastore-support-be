import express from "express";
import fileUpload from "../helper/multer";
import Auth from "../middleware/auth";
import { 
    createAnArticle,
    viewAll,
    viewOneArticle,
    updateArticle,
    deleteArticle,
    findArticlesByCategoryTitle
 } from "../controllers/article.controller";

 const articleRoute = express.Router();
 articleRoute.post("/:categoryId/category",Auth,fileUpload.single("title"),createAnArticle);
 articleRoute.get("/:categoryId/category/viewArticles",viewAll);
 articleRoute.get("/:categoryTitle/category", findArticlesByCategoryTitle);
 articleRoute.get("/:articleId", viewOneArticle);
 articleRoute.put("/:articleId",Auth,fileUpload.single("title"),updateArticle);
 articleRoute.delete("/:articleId",Auth,fileUpload.single("title"),deleteArticle);

 export default articleRoute;