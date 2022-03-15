const { log } = require("console");
const express = require("express");
const { createCollege, getAllCollege } = require("../controllers/collegeController");
const {isLoggedIn, isHead}= require("../middleware/auth");


const collegeRouter = express.Router();



collegeRouter.route("/college/new").post(isHead, createCollege);
collegeRouter.route("/college/all").get(getAllCollege);

module.exports=collegeRouter;