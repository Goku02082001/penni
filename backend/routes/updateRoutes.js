import express from "express";
import updateBlog from "../controllers/updateBlogController.js";
const routes=express.Router()

routes.patch('/updatePost/:id',updateBlog)

export default routes