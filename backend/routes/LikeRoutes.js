import express  from "express";
import { toggleLike,getLikes } from "../controllers/likeController.js";
import verifyToken from "../middelware/getData.js";

const routes=express.Router()

routes.post("/like", verifyToken, toggleLike);
routes.get('/likes/:postId',getLikes)

export default routes