import express from 'express'
import dotenv from'dotenv'
import connectDb from './db/db.js'
import AuthRoutes from './routes/AuthRoutes.js'
import postBlogRoutes from './routes/postBlogRoutes.js'
import getBlogRoutes from './routes/postGetRoutes.js'
import updateBlog from './routes/updateRoutes.js'
import deleteData from './routes/deleteRoutes.js'
import cors from 'cors'
const app=express()
dotenv.config()
const PORT=process.env.PORT || 5000
app.use(express.json());
app.use(cors({
    origin:"*"
}))

app.get('/',(req,res)=>{
    res.send("Hello")
})

app.use('/api',postBlogRoutes)
app.use('/api',getBlogRoutes)
app.use('/api',AuthRoutes)
app.use('/api',updateBlog)
app.use('/api',deleteData)
app.listen(PORT,()=>{
    connectDb()
    console.log(`Connected Successfull localhost: ${PORT}`)
})