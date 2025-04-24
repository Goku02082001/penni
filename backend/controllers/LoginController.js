import user from "../models/userAuthModel.js";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

dotenv.config()
const jwt_SecretKey=process.env.JWT_SECRETKEY
const Login=async(req,res)=>{
   try {
    const {email,password}=req.body
    const userData=await user.findOne({email})

    if(!userData)
    {
        res.status(400).json({message:"your not registred"})
    }

    const datapassword= await  bcrypt.compare(password,userData.password)
    if(!datapassword)
    {
        res.status(401).json({message:"password does not match"})
    }
    const token= jwt.sign({id:userData.id,email:userData.email},jwt_SecretKey,{expiresIn:"1h"})
    res.status(200).send({message:"You are singin successFully",token})
   } catch (error) {
    res.status(500).json({message:"Something went wrong",error:error.message})
   }
}

export default Login