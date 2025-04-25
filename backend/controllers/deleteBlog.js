import createBlog from "../models/blogModel.js";
import mongoose from "mongoose";
const deletPost=async(req,res)=>{
    try {
        const { id } = req.params;
        console.log(id)
        const deleteData=await createBlog.findByIdAndDelete(id)

        if(!deleteData)
        {
            res.status(200).json({message:"post is not found"})
        }

        res.status(201).send({message:"your data successFully Deleted",deleteData})
    } catch (error) {
        res.status(400).json({message:"Something went wrong"})
    }
}

export default deletPost