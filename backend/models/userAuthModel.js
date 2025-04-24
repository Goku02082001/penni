import mongoose from "mongoose";

const userAuth=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true
    }
})

const user=new mongoose.model('user',userAuth)

export default user