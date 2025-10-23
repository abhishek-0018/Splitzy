import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"

const app=express();


//If we don’t have below 2 lines, req.body will always be undefined for JSON requests.
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(cookieParser())

import userRouter from './routes/user.routes.js'
import groupRouter from './routes/group.routes.js'

app.use("/api/v1/users",userRouter)
app.use("/api/v1/groups",groupRouter)

export {app};