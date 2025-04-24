import user from "../models/userAuthModel.js";
import bcrypt from 'bcrypt'
const AuthRegister=async(req,res)=>{
    try {
        const{userName,email,password}=req.body

    const userData=await user.find({email})
    if(userData.length>0)
    {
        res.status(400).json({message:"user is already exist",userData})
    }
    const hashPassword=await bcrypt.hash(password,10)
    const data=new user({userName:userName,email:email,password:hashPassword})
    await data.save()
    res.status(200).send({message:"Registred Successfully"})
    } catch (error) {
        res.status(404).json({message:"Something went wrong ",error:error.message})
    }
}

export default AuthRegister