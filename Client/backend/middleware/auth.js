// --------------------
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        res.status(401).json({
            success: false,
            message: "Please, Login"
        })
        return;
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedData.id);
    if (!user) {
        res.status(401).json({
            success: false,
            message: "Please, Login"
        })
        return;
    }
    req.user = user;
    next();
};
// --------------------


exports.isHead=async (req,res,next)=>{
    const { token } = req.cookies;
    if (!token) {
        res.status(401).json({
            success: false,
            message: "Please, Login"
        })
        return;
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedData.id);
    if (!user) {
        res.status(401).json({
            success: false,
            message: "Please, Login"
        })
        return;
    }
    user;
    if(user.role!=='head_of_placement_cell'){
        res.status(401).json({
            success: false,
            message: `Role ${user.role} is not have access`
        })
        return;
    }
    next();
}
