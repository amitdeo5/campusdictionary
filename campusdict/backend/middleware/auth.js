// --------------------
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({
            error: "Please, Login 😕"
        });
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedData.id);
    if (!user) {
        return res.status(401).json({
            error: "Please, Login 😕"
        });
    }
    req.user = user;
    next();
};
// --------------------


exports.isHead=async (req,res,next)=>{
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({
            error: "Please, Login 😕"
        })
        
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedData.id);
    if (!user) {
        return res.status(401).json({
            error: "Please, Login 😕"
        });
    }
    user;
    if(user.role!=='head_of_placement_cell'){
        return res.status(401).json({
            error: `Role ${user.role} is not have access 😕`
        });
    }
    next();
}
