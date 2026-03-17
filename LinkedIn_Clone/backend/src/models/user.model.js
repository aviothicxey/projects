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
    education:  [educationSchema],      // ✅ subdocument schema (gets _id automatically)
    experience: [experienceSchema],     // ✅ fixed typo
    location:   { type: String },
    gender: {
        type: String,
        enum: ["male", "female", "others"]
    },
    connections: [{                     // ✅ renamed + fixed ref
        type: mongoose.Schema.Types.ObjectId,
        ref:  'User'                    // ✅ string, not undefined variable
    }]
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// ⚠️ Remember: only works if query uses .select('+password')
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const userModel = mongoose.model('User', UserSchema);
module.exports = userModel;