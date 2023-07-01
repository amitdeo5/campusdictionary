const express= require('express');
const { registerUser, logoutUser, loginUser, verification } = require('../controllers/userController');
const userRouter=express.Router();
const token= require('../models/token');

userRouter.route('/user/register').post(registerUser);
userRouter.route('/user/logout').get(logoutUser);
userRouter.route('/user/login').post(loginUser);
userRouter.route('/:id/verify/:token').get(verification)


module.exports=userRouter;