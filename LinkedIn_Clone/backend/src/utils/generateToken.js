const jwt = require('jsonwebtoken');

async function generateToken(userId){
    try{
        const token = jwt.sign({userId} , process.env.JWT_SECRET , {expiresIn : process.env.JWT_EXPIRES_IN});
        return token;
    }catch(err){
        console.log(err);
    }
}




module.exports = generateToken;