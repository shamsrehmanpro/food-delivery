import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import {mailTrapClient, sender} from "../mailtrap/mailtrap.config.js"
import {VERIFICATION_EMAIL_TEMPLATE} from "../mailtrap/emailTemplate.js"
import {sendWelcomeEmail, sendResetSuccessfulEmail, sendPasswordResetEmail} from "../mailtrap/sendWelcomeEmail.js"

import crypto from 'crypto'


//Login user
const loginUser = async (req, res) => {
        const {email, password} = req.body;

        try {
            const user = await userModel.findOne({email})
                if (!user) {
                    res.json({success: false, message: "user Doesn't Exist"})
                }
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                res.json({success: false, message: "invalid credentials"})
            }
            const token = createToken(user._id)
            res.json({success: true, token})

            
        } catch (error) {
            console.log(error);
            res.json({success: false, message:"error"})
        }

       

}

//create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//register user
const registerUser = async (req, res) => {
        const {name, email, password} = req.body;

        try {
            //checking is user exist
            const exists = await userModel.findOne({email});
            if (exists) {
                return res.json({success: false, message: "user Already exists"})
            }

            //validating email format & strong password
            if (!validator.isEmail(email)) {
                return res.json({success: false, message: "please enter a valid email"})
            }

            if (password.length<8) {
                return res.json({success: false, message: "please enter a strong password"})
            }

            //hashing user password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            //verification token otp
            const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()

            //create new user
            const newUser = new userModel({
                name: name,
                email: email,
                password: hashedPassword,
                verificationToken: verificationToken,
                verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24 hours
            })

            const user = await newUser.save()

            //create token
            const token = createToken(user._id)
            res.json({success: true, token})
            

            await sendVerificationEmail(newUser.email, verificationToken);
            
           
        } catch (error) {
            console.log(error);
            res.json({success: false, message:"Error"})
        }
}

const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }]
    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        });
        console.log("Email sent successfully", response);
    } catch (error) {
        console.error("Error sending verification email", error);
    }
};

const verifyEmail = async(req, res) => {
    //1 2 3 4 5
    const {code} = req.body
    try {
        const user = await userModel.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt : Date.now() }
        })

        if (code.length !== 6) {
            return res.status(400).json({success: false, message: 'Invalid or expired verification Code'})
        }

        user.isVerified = true
        user.verificationToken = null
        user.verificationTokenExpiresAt = null
        await user.save();
        const token = createToken(user._id)
            await sendWelcomeEmail(user.email, user.verificationToken);
           

        res.status(200).json({
            success: true,
            message: "Email verified",
            token,
        })
    } catch (error) {
        console.log(error);
        
    }
}

const forgotPassword = async(req, res) => {
    const {email} = req.body

    try {
        const user = await userModel.findOne({email})
        if (!user) {
            res.status(400).json({success: false, message: "User not found"});
        }

        //generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex")
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; //1 hour
        user.resetPasswordToken = resetToken
        user.resetPasswordExpiresAt = resetTokenExpiresAt
        await user.save()

        //send email
        await sendPasswordResetEmail(user.email, `http://localhost:5173/reset-password/${resetToken}`)
        res.status(200).json({success: true, message: "Error not in forgot password", resetToken});
    
    } catch (error) {
        console.log("Error in forgot password", error);
        res.status(400).json({success: false, message: "Error in forgot password"});
    }
    
}

const resetPassword = async(req, res) => {
    try {
        const {token} = req.params
        const {password} = req.body
        const user = await userModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: {$gt: Date.now()}
        })

        if (!user) {
            return res.status(400).json({success: false, message: 'Invalid or expired verification Code'})
        }

        //update password
        const hashedPassword = await bcrypt.hash(password, 10)
        user.password = hashedPassword
        user.resetPasswordToken = null
        user.resetPasswordExpiresAt = null
        await user.save()
        
        await sendResetSuccessfulEmail(user.email)
        res.status(200).json({success: true, message: 'password reset successful'})
    } catch (error) {
        console.log('reset password not set', error);
        res.status(400).json({success: false, message: 'reset password not set'})
        
    }
}


export {loginUser, registerUser, verifyEmail, forgotPassword, resetPassword}