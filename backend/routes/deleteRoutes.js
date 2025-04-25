import express from "express";
import deletPost from "../controllers/deleteBlog.js";

const routes= express.Router()

routes.delete('/deletePost/:id',deletPost)

export default routes