import express from "express";
import UserData from "../controllers/getUserDataController.js";

const routes=express.Router()

routes.get('/getuserData',UserData)

export default routes