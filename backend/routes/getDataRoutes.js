import express from "express";
import getLoggedInUser from "../controllers/getUserDataController.js";
import verifyToken from "../middelware/getData.js";
const routes=express.Router()

routes.get('/getuserData',verifyToken,getLoggedInUser)

export default routes