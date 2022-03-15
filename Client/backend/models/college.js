const mongoose=require('mongoose');

const collegeSchema=new mongoose.Schema({
    name: String,
    description: String,
    placements: Number
})

const collegeModel=mongoose.model("Colleges",collegeSchema);
module.exports=collegeModel;