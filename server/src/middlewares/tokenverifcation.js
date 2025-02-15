const jwt = require('jsonwebtoken');
require("dotenv").config();

const tokenVerify = async (req, res,next) => {
    const token = req.cookies?.jwtToken;
    if(!token){
        return res.status(401).json({message:"No token provided"});
    }
    jwt.verify(token, process.env.JWT_SCERET, (err, decoded) => {
        if(err) return res.status(401).json({message:"token expired"});

        req.user = decoded;
        next();
    })
}
module.exports = tokenVerify