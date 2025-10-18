import mongoose from "mongoose";
import userModel from '../model/User.model.js'; 
import sendEmail from "../config/sendEmail.js";

import generateAccessToken from "../utils/generateAccesstoken.js";
import generateRefreshToken from "../utils/generateRefreshtoken.js";
import verifyEmailTemplate from "../utils/verifyEmailtemplate.js";

import bcryptjs from 'bcryptjs'

export async function registerUser(req, res){
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message : "provide email,name , password" ,
                error : true,
                success : false

            })
        }
        const user = await userModel.findOne({ email });
        if(user){
            return res.json({
                message: "already registered email",
                error: true,
                success: false,
                data : user
            });

        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        const payload = {
            name,
            email,
            password : hashPassword
        }
        const newuser= new userModel(payload);
        const save = await newuser.save()

        const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;

        const verifyEmail = await sendEmail({
            sendTo : email,
            subject : "Verify email from binkeyit",
            html : verifyEmailTemplate({
                name,
                url : VerifyEmailUrl
                
            }),
            from: "no-reply@yourdomain.com",
        })

        return res.json({
            message : "User register successfully",
            error : false,
            success : true,
            data : save
        })
        
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,

            error : true,
            success : false 

        })

        
    }
}

// login
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Provide email and password",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not registered",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: "Check your password",
        error: true,
        success: false,
      });
    }

    const accesstoken = await generateAccessToken(user._id);
    const refreshtoken = await generateRefreshToken(user._id);

    await userModel.findByIdAndUpdate(user._id, {
      last_login_date: new Date(),
    });

    const cookiesOption = {
      httpOnly: true,
      secure: false, // for local dev
      sameSite: "Lax",
    };

    res.cookie("accessToken", accesstoken, cookiesOption);
    res.cookie("refreshToken", refreshtoken, cookiesOption);

    // ✅ Send full user details with tokens
    return res.json({
      message: "Login successfully",
      error: false,
      success: true,
      data: {
        user: {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image,
        },
        accesstoken,
        refreshtoken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//logout controller

export async function logoutController(req,res){
    try {
        const userid = req.userId //middleware

        const cookiesOption = {
            httpOnly: true,
            secure: false,   // local dev ke liye
            sameSite: "Lax"
            }

        res.clearCookie("accessToken",cookiesOption)
        res.clearCookie("refreshToken",cookiesOption)

        const removeRefreshToken = await userModel.findByIdAndUpdate(userid,{
            refresh_token : ""
        })

        return res.json({
            message : "Logout successfully",
            error : false,
            success : true
        })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error : true,
            success : false

        })
        
    }
}