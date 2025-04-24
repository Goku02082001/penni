import express from "express";
import Login from "../controllers/LoginController.js";
import AuthRegister from "../controllers/RegisterController.js";
const routes=express.Router()

routes.post('/register',AuthRegister)
routes.post('/login',Login)

export default routes