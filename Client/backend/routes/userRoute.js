const express= require('express');
const { registerUser, logoutUser, loginUser } = require('../controllers/userController');
const userRouter=express.Router();

userRouter.route('/user/register').post(registerUser);
userRouter.route('/user/logout').get(logoutUser);
userRouter.route('/user/login').post(loginUser);


module.exports=userRouter;