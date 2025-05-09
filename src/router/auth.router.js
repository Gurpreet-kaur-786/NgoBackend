import {checkAuth} from "../middleware/checkToken.js"
import express from "express";
import { getSpecificData, handleAuth, handleAuthLogin, handleGetData, handleSingleData, handleUpdate } from "../controller/auth.controller.js";
import upload from "../utility/multer.js"

const authRouter = express.Router()

authRouter.post('/n', upload.fields([
    { name: 'img1', maxCount: 1 },
    { name: 'img2', maxCount: 1 },
    { name: 'img3', maxCount: 1 }
]), handleAuth);
authRouter.post('/l',handleAuthLogin)
authRouter.get('/g',handleGetData)
authRouter.get('/singleData/:id',handleSingleData)

// Update route
authRouter.put('/update/:id',handleUpdate)
authRouter.get('/getSpecificData',checkAuth,getSpecificData)

export default authRouter
