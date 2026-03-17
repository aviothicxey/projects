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
    },
    profileImage : {
        type: String,
        default : "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg?semt=ais_hybrid&w=740&q=80"
    },
    coverImage : {
        type: String,
        default:""
    },
    headline:{
        type : String,
        default:""
    },
    skills : [{type : String}],

    education:[
        {
            college : {type : String},
            degree : { type : String},
            fieldOfStudy : {type : String}
        }
    ],
    location:{
        type : String
    },
    gender:{
        type : String,
        enum : ["male" , "female" , "others"]
    },

    experince:[
        {
            title : {type : String},
            company : {type : String},
            description : {type : String}
        }
    ],

    connection : [
        {type : mongoose.Schema.Types.ObjectId,
            ref : User
        }
    ]



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