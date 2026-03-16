const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    username: {
        type : String,
        required : true,
        unique : true
    },
    email :{
        type: String,
        required : [true , "Email is required"] ,
        unique : true,
        lowercase: true,
        trim : true,
        match:[/^\S+@\S+\.\S+$/ , "Please provide a valid email address"]

    },
    password : {
        type : String,
        required : [true , "Password is required"],
        minlength : [6, "Password must be at least 6 characters long"],
        select: false  // This will prevent the password from being returned in queries by default
    }

} , {timestamps:true});

UserSchema.pre("save" , async function(next){
    if(!this.isModified("password")){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password);
}

const userModel = mongoose.model('User' , UserSchema);

module.exports = userModel;