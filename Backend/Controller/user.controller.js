import mongoose from "mongoose";
import userModel from '../model/User.model.js'; 
import sendEmail from "../config/sendEmail.js";
import { OAuth2Client } from "google-auth-library";


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
// login user



const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function googleLoginController(req, res) {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        message: "Google token missing",
        error: true,
        success: false,
      });
    }

    // 1. Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, given_name, family_name, picture } = payload;

    // 2. Find or create user
    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        email,
        firstName: given_name || "",
        lastName: family_name || "",
        image: picture || "",
        authProvider: "google",
        // password field skip — Google users ko password nahi chahiye
      });
    }

    // 3. Same token generation jaisa normal login mein hai
    const accesstoken = await generateAccessToken(user._id);
    const refreshtoken = await generateRefreshToken(user._id);

    await userModel.findByIdAndUpdate(user._id, {
      last_login_date: new Date(),
    });

    const cookiesOption = {
      httpOnly: true,
      secure: false, // local dev
      sameSite: "Lax",
    };

    res.cookie("accessToken", accesstoken, cookiesOption);
    res.cookie("refreshToken", refreshtoken, cookiesOption);

    return res.json({
      message: "Google login successfully",
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