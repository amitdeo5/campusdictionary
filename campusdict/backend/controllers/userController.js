const User = require("../models/user");
const jwt = require('jsonwebtoken'); 

exports.registerUser=async (req,res,next)=>{
    try{

        const user = await User.create(req.body);

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        })

        let options={
            httpsOnly: true,
            expires: new Date(
                Date.now + process.env.COOKIE_EXPIRE * 24 * 60 * 1000
            ),
        }
        res.status(201).cookie("token",token,options).cookie("user",user,options).json({
            success: true,
            token,
            user
        })
    }catch(err){
        res.status(400).json({
            success: false,
            error: err
        })
    }
}


exports.loginUser=async(req,res,next)=>{
    try{
        const {email, password } = req.body;
        const user=await User.findOne({email});

        if(!email||!password){
            return res.status(401).json({
                error: "Please add all the fields 😇" 
            })
        }
        
        if(!user){
            return res.status(400).json({
                error: "This email is not registered yet 😕"
            })
        }
        
        if(password!==user.password){
            return res.status(401).json({
                error: "Password is incorrect 😱" 
            })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        })

        let options = {
            httpsOnly: true,
            expires: new Date(
                Date.now + process.env.COOKIE_EXPIRE * 24 * 60 * 1000
            ),
        }
        return res.status(201).cookie("token",token,options).cookie("user",user,options).json({
            success: true,
            token,
            user
        })

    }catch(err){
        return res.status(400).json({
            error: err
        })
    }
}

exports.logoutUser=async (req,res,next)=>{
    try{
        res.status(200).cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        }).json({
            success: true,
            message: "Logged Out"
        })
    }catch(err){
        res.status(400).json({
            success: false,
            error: err
        })
    }
}
