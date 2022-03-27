const College = require("../models/college");


exports.createCollege =async (req,res,next)=>{
    try{
        const college = await College.create(req.body);
        console.log(req.body);
        
        if(!college){
            return res.status(400).json({
                error: "This college Can't be create due some error 😱"
            });

        }
        return res.status(201).json({
            success: true,
            college
        });
    }catch(err){
        return res.status(401).json({
            error: `This college Can't be create due error : ${err} 😱`
        })
    }
}



exports.getAllCollege = async (req, res, next) => {
    try {
        const colleges = await College.find({});

        return res.status(201).json({
            success: true,
            colleges
        });
    } catch (err) {
        return res.status(401).json({
            error: `some error has occurred : ${err} 😱`
        })
    }
}