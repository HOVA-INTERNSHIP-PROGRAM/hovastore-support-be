import express from "express";
import fileUpload from "../helper/multer";

import { createUser,  deleteUser, getAllUsers, getOneUser, login, updateUser, forgotPassword, resetPassword } from "../controllers/users.controller";
const userRoute = express.Router();
userRoute.get("/", getAllUsers);
userRoute.get("/:id", getOneUser);
userRoute.post("/", fileUpload.single("img"), createUser);
userRoute.put("/:id", fileUpload.single("img"), updateUser);
userRoute.delete("/:id", deleteUser);
userRoute.post("/auth", fileUpload.single("files"), login);
userRoute.post("/forgot-password", fileUpload.single("files"), forgotPassword);
userRoute.post("/reset-password/:resetToken/:id", fileUpload.single("files"), resetPassword);

export default userRoute;
