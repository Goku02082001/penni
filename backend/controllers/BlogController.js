import createBlog from "../models/blogModel.js";

const postBlog=async(req,res)=>{
    try {
        const{title,content,tags}=req.body

        const blogData=new createBlog({title,content,tags})
        await blogData.save()
        res.status(200).send({message:"Your post successFully Post",blogData})
    } catch (error) {
        res.status(400).json({message:"Something went wrong",error:error.message})
    }

}
export default postBlog