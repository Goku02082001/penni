import express from "express";
import getblog from "../controllers/getBlogController.js";
const routes=express.Router()

routes.get('/getBlog',getblog)

export default routes