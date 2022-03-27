const express = require('express');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')


const app = express();

app.use(express.json());

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

module.exports = app