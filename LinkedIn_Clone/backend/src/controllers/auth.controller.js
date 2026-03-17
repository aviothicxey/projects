const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function signUp(req , res){
    try{
        const { name , email , password} = req.body;
        const userAlrExist = await userModel.findOne({email});
        if(userAlrExist){
            return res.status(400).json({
                message : "User already exits with this email.Please login instead."
            })
        }
        const userNameAlrExist = await userModel.findOne({username});
        if(userNameAlrExist){
            return res.status(400).json({
                message : "User already exits with this username .Please login instead."
            })
        }
        if(!name || !email || !password){
            return res.status(400).json({
                message : "Please provide all the required credentials."
            })
        }

        const user = await User.create({
            firstName,
            lastName,
            username,
            email,
            password: undefined
        })

        return res.status(201).json({
            success : true,
            message : "User registered successfully",
            user
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Something went wrong while registering the user",
            error : err.message
        })
    }
    
}




module.exports = {signUp};