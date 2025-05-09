import dotenv from 'dotenv'
dotenv.config()
import connectDB from './db/database.js'


import express from 'express'
import authRouter from './router/auth.router.js'
import cookieParser from 'cookie-parser'
import donerRouter from './router/donation.router.js'
import validateRouter from './router/validate.router.js'
import cors from "cors"
import donerInfoRouter from './router/donerInfo.router.js'

const app = express()
const port = process.env.PORT 

// built in middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use('/uploads',express.static('uploads'))

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'], 
}));

// router level middleware
app.use('/',authRouter)
app.use('/',donerRouter)
app.use('/',validateRouter)
app.use('/',donerInfoRouter)

connectDB()
app.listen(port,()=>{
    console.log(`server run on http://localhost:${port}`)
})

