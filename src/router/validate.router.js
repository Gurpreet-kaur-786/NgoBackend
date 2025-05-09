import express from "express";
import { GetStudentApplication, handleStudentGet, handleValidate, handleValidateLogin, handleDelete,handleValidateUpdate, OnlyValid, handleByIdGet, handleStudeDetail } from "../controller/validate.controller.js";
import { checkAuth } from "../middleware/checkToken.js";

const validateRouter = express.Router()

validateRouter.post('/v',handleValidate)
validateRouter.get('/vl',handleValidateLogin)
validateRouter.put('/update',handleValidateUpdate)
validateRouter.get('/getValidate',handleStudentGet)
validateRouter.get('/getValidate/:id',handleByIdGet)
validateRouter.get('/studentDetail/:id',checkAuth,handleStudeDetail)
validateRouter.delete('/validationdelete/:id',handleDelete)
validateRouter.get('/onlyValid',OnlyValid)
validateRouter.get('/getApplication',checkAuth,GetStudentApplication)
export default validateRouter 