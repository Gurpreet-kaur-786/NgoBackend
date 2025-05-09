import express from 'express'
import { handleDoner, handleDonerGet, handleSpecficDonerGet} from '../controller/donation.controller.js'
import { checkAuth } from '../middleware/checkToken.js'

const donerRouter = express.Router()

donerRouter.post('/d',checkAuth,handleDoner)
donerRouter.get('/login',handleDonerGet)
donerRouter.get('/userTransaction',checkAuth,handleDonerGet)
donerRouter.get('/userSpecificTransaction',checkAuth,handleSpecficDonerGet)

export default donerRouter