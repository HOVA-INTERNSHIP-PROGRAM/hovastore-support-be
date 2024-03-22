import express from "express";
import fileUpload from "../helper/multer";

import { createUser,  deleteUser, getAllUsers, getOneUser, login, updateUser } from "../controllers/users.controller";
const userRoute = express.Router();
userRoute.get("/read", getAllUsers);
userRoute.get("/read/:id", getOneUser);
userRoute.post("/create", fileUpload.single("img"), createUser);
userRoute.put("/update/:id", fileUpload.single("img"), updateUser);
userRoute.delete("/delete/:id", deleteUser);
userRoute.post("/auth", fileUpload.single("files"), login);


export default userRoute;
