// verifyToken.js

const jwt = require("jsonwebtoken");

function verifyToken(req,res,next){
    const Token = req.cookies.token;
    if(!Token){
        return res.status(401).json({
            success : false,
            message : "Unauthorized , Please login to access this page"
        });
    }
    try{
        const decoded = jwt.verify(Token , process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
            next(err);
        
    }

}
module.exports = verifyToken;