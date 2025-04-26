import express from "express";
import verifyToken from "../middelware/getData.js";
import { addComment,getComments } from "../controllers/commentController.js";

const routes=express.Router()


routes.post("/comment", verifyToken, addComment)
routes.get("/comments/:postId",getComments)

export default routes