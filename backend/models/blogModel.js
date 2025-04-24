import mongoose from "mongoose";


const blogCreate =new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        enum:["Health","Technology","Travel","Food","LifeStyle","other"],
        required:true
    }
})
const createBlog=new mongoose.model('createBlog',blogCreate)

export default createBlog