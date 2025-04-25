import express from "express";
import postBlog from "../controllers/BlogController.js";

const routes=express.Router()
routes.post('/postBlog',postBlog)

export default routes