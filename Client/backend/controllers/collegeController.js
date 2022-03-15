const College = require("../models/college");


exports.createCollege =async (req,res,next)=>{
    try{
        const college = await College.create(req.body);

        if(!college){
            res.status(400).json({
                success: false,
                message: `This college Can't be create due some error`
            })
            return;

        }
        res.status(201).json({
            success: true,
            college
        });
    }catch(err){
        res.status(401).json({
            success: false,
            message: `This college Can't be create due error : ${err}`
        })
    }
}



exports.getAllCollege = async (req, res, next) => {
    try {
        const colleges = await College.find({});

        res.status(201).json({
            success: true,
            colleges
        });
    } catch (err) {
        res.status(401).json({
            success: false,
            message: `some error has occurred : ${err}`
        })
    }
}