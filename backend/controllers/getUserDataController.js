import user from "../models/userAuthModel.js";

const UserData=async(req,res)=>{
    try {
        const{userName,email}=req.body
        const data=await user.find({email})
        res.status(200).send({message:"Your data succesfully get" ,data})
    } catch (error) {
        res.status(201).json({message:"something went wrong",error:error.message})
    }
}

export default UserData