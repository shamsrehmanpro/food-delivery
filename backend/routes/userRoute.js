import express from "express"
import {loginUser, registerUser, verifyEmail, forgotPassword, resetPassword} from '../controller/userController.js'

const userRouter = express.Router()


userRouter.post('/login', loginUser)
userRouter.post('/register', registerUser)
userRouter.post('/verify-email', verifyEmail)
userRouter.post('/forgot-password', forgotPassword)
userRouter.post('/reset-password/:token', resetPassword)

export default userRouter



