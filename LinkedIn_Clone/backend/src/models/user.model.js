const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const educationSchema = new mongoose.Schema({
    college:      { type: String },
    degree:       { type: String },
    fieldOfStudy: { type: String }
});

const experienceSchema = new mongoose.Schema({
    title:       { type: String },
    company:     { type: String },
    description: { type: String }
});

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    username: {
        type:     String,
        required: true,
        unique:   true,
        index:    true
    },
    email: {
        type:      String,
        required:  [true, "Email is required"],
        unique:    true,
        lowercase: true,
        trim:      true,
        match:     [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
    },
    password: {
        type:      String,
        required:  [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        select:    false
    },
    profileImage: {
        type:    String,
        default: "https://img.freepik.com/..."
    },
    coverImage: { type: String, default: "" },
    headline:   { type: String, default: "" },
    skills:     [{ type: String }],
    education:  [educationSchema],      
    experience: [experienceSchema],     
    location:   { type: String },
    gender: {
        type: String,
        enum: ["male", "female", "others"]
    },
    connections: [{                     
        type: mongoose.Schema.Types.ObjectId,
        ref:  'User'                    
    }]
}, { timestamps: true });

UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
});

//Remember: only works if query uses .select('+password')
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const userModel = mongoose.model('User', UserSchema);
module.exports = userModel;