const College = require('../models/college');
const User  = require('../models/user');
const express=require('express');
const moment =require('moment')
const nodeMailer = require('nodemailer');
const emailRouter =express.Router();

emailRouter.post('/send-email',async(req,res)=>{
    const {to,cc,subject,text}=req.body;
    const arr=JSON.parse(text);
    const transporter=nodeMailer.createTransport({
        host : process.env.HOST,
        service:process.env.SERVICE,
        auth:{
            user:process.env.USER,
            pass:process.env.PASS,
        },
    });
    try{
     
     const college = await College.findOne({name:arr.collegeName})
     const email =college.addedBy.email;
     const user = await User.findOne({email:email});
        // {"name":"mahesh","date":"2023-07-25T18:30:00.000Z","time":6,"orgname":"Google","instruct":"Nothing"}
    await transporter.sendMail({
        from:process.env.USER,
        to,
        cc,
        subject,
        html:`<html>
        <head>
          <meta charset="UTF-8">
          <title>Meeting Confirmation</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
            }
            h1 {
              color: #333333;
              font-size: 24px;
            }
            p {
              margin-bottom: 10px;
            }
          </style>
        </head>
        <body>
          <h1>Hi ${arr.name},</h1>
          <p>Your Meeting With ${college.name} with Campus Dictionary at ${arr.time} (India Standard Time) on ${moment(arr.date).format('MMMM DD, YYYY')}  is scheduled.</p>
          <p>Mr. ${user.name} </p>
          <p>TPC Coordinator</p>
          
          <h2>About Institution:</h2>
          <p>${college.description}.</p>
          
          <h2>Location:</h2>
          <p>This is a Google Meet web conference. <a href="${college.meet_link}">Join now</a></p>

          ${arr.instruct && `<h5>Instruction - ${arr.instruct}</h5>`}
          
          <p>Thanks & Regards,</p>
          <p>Campus Dictionary</p>
        </body>
        </html>`
    });

    res.status(200).json({message:'Email sent successfully'});
   }
   catch(error){
    console.error('Error sending email:', error);
    console.log(error);
    res.status(500).json({ error: 'Failed to send email.' });
   }
})

module.exports= emailRouter;
