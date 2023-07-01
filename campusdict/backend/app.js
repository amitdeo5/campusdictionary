const express = require('express');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors());
// for post requests parsing data
//-------------------------------------

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cookieParser());

const collegeRouter=require("./routes/collegeRoute");
app.use("/api/v1",collegeRouter);

const userRouter = require("./routes/userRoute");
app.use("/api/v1", userRouter);

const emailRouter =require('./routes/emailRoute');
app.use("/api/v1",emailRouter);

module.exports = app