const User = require("../models/user");
const jwt = require('jsonwebtoken'); 
const sendEmail = require("../utils/sendEmail");
const Token = require("../models/token")
const crypto =require('crypto');
exports.registerUser=async (req,res,next)=>{
    try{
        const duplicate=await User.findOne({email:req.email});
        if(duplicate!==null){
            return res.status(400).json({
                success:false,
                error:'User has already been existed with this email.'
            })
        }
        let user = await User.create(req.body);

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        })
        const verificationToken =await  new Token({
            userId:user._id,
            token:crypto.randomBytes(32).toString('hex'),
        }).save();
        const url = `${process.env.BASE_URL}users/${user._id}/verify/${verificationToken.token}`
        await sendEmail(user.email,"Verify Email",url);
        let options={
            httpsOnly: true,
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 1000
            ),
        }
        res.status(201).cookie("token",token,options).cookie("user",user,options).json({
            success: true,
            token,
            user
        })
    }catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            success: false,
            error: err
        })
    }
}
exports.verification=async(req,res)=>{
    try{
        const user = await User.findOne({_id:req.params.id});
        if(!user){
            return res.status(400).send({message:'Invalid link'});
        }
        const token =await Token.findOne({
            userId:user._id,
            token:req.params.token,
        });
        if(!token){
            return res.status(400).send({message:'Invalid link'});
        }
        await User.updateOne({_id:user._id,},
            { $set: { verified: true } },
        );
        await token.remove();
        res.status(200).send("Email verified Successfully");
    }
    catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            success: false,
            error: err
        })
    }
}


exports.loginUser=async(req,res,next)=>{
    try{
        const {email, password } = req.body;
        const user=await User.findOne({email});
        // console.log(user);

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
        if(Boolean(user.verified)===false){
            let token = await Token.findOne({userId:user._id})
            if(!token){
                token = await new Token({
                    userId:user._id,
                    token:crypto.randomBytes(32).toString('hex'),
                }).save();
            }
            const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`
            await sendEmail(user.email,"Verify Email",url);
            return res.status(400).json({
                message:"An Email sent to your account please verify",
            });
        }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        })

        let options = {
            httpsOnly: true,
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 1000
            ),
        }
        return res.status(201).cookie("token",token,options).cookie("user",user,options).json({
            success: true,
            token,
            user
        })

    }catch(err){
        console.log(err);
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
