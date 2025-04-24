import createBlog from "../models/blogModel.js";

const getblog=async(req,res)=>{
    try {
        const blog= await createBlog.find()
        res.status(200).send({messsage:"your data get SuccessFully",blog})
        
    } catch (error) {
        res.status(400).send({message:"something went wrong",error:error.message})
    }
}

export default getblog