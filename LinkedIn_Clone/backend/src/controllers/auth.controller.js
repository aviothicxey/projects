const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { validationResult} = require("express-validator");
const generateToken = require("../utils/generateToken");

// Sign up controller:
async function signUp(req , res , next){

    // a request comes in --> Validate --> talk to db --> send the response back to client
    try{
        // Validation errors:
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success : false,
                message : errors.array()
            });
        }
        const {firstName, lastName, username, email, password } = req.body;

        // check is user with the same email or username already exits:
        const userAlrExist = await User.findOne({email});
        if(userAlrExist){
            return res.status(400).json({
                success : false,
                message : "User already exits with this email.Please login instead."
            })
        }
        const userNameAlrExist = await User.findOne({username});
        if(userNameAlrExist){
            return res.status(400).json({
                success : false,
                message : "User already exits with this username .Please login instead."
            })
        }
        // if(!name || !email || !password){
        //     return res.status(400).json({
        //         message : "Please provide all the required credentials."
        //     })
        // }  // this is no more required as we are using express validator for validation
        
        // create user:
        const newUser = await User.create({
            firstName,
            lastName,
            username,
            email,
            password // this password will be hashed in the user model before saving to db
        })

        const token = generateToken(newUser._id);
        res.cookie("token" , token,{
            httpOnly : true,
            maxAge : 24 * 60 * 60 * 1000 ,// 1 dayyy
            sameSite: "strict",
            secure : process.env.NODE_ENV === "production"
        })
// about api --> 201 --> sucess -> : A new resource has been created (successful POST request)

        return res.status(201).json({
            success : true,
            message : "User registered successfully",
            newUser 
        })
    }catch(err){
        next(err);
    }    
};

async function login(req , res , next){
    try{
        // Validation errors:
        const errors = validationResult(req);
        if(!errors.isEmpty()){
      //about api --> 400 --> invalid req body or missing parameters in request
            return res.status(400).json({
                success : false,
                errors : errors.array()
            });
        }
        const {email, password} = req.body;
        // check if user with the email exists or not:
        const user = await User.findOne({email}).select("+password");
        if(!user){
            return res.status(400).json({
                success : false,
                message : "Invalid email or password"
            });
        }
// check is password is correct by comparing the hashed password in db with the password provided by user:
        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return res.status(401).json({
                success : false,
                message : " Invalid email or password"
            });
        }
                const token = generateToken(user._id);
                res.cookie("token" , token,{
                httpOnly : true,
                maxAge : 24 * 60 * 60 * 1000 ,// 1 dayyy
                sameSite: "strict",
                secure : process.env.NODE_ENV === "production"
               });
        return res.status(200).json({
            success : true,
            message : "User logged in successfully",
            user
        });
    }catch(err){
        next(err);
    }
};
async function logout(req , res , next){
    try{
        res.clearCookie("token");
        return res.status(200).json({
            success : true,
            message : "User logged out successfully"
        });
    }catch(err){
        next(err);
    }
}



module.exports = {signUp, login, logout};