const mongoose=require('mongoose');

const collegeSchema=new mongoose.Schema({
    name: String,
    addedBy:{
        email: String,
    },
    description: String,
    placements: String,
    pic:String,
    meet_link:String,
})

const collegeModel=mongoose.model("Colleges",collegeSchema);
module.exports=collegeModel;