import express from "express";
import { handleDonerInfo, handleDonerInfoGet, updateDonorInfo } from "../controller/donerInfo.controller.js";

const donerInfoRouter = express.Router()

donerInfoRouter.post('/addDoner',handleDonerInfo)
donerInfoRouter.get('/donerGet',handleDonerInfoGet)
donerInfoRouter.put('/doner/update/:id',updateDonorInfo)

export default  donerInfoRouter