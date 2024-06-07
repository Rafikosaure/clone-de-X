import express from 'express'
import userCtrl from '../controllers/userControllers.js'



const router = express.Router()

router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)


export default router