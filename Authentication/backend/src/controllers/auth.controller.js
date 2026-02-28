const { hash } = require("bcrypt");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateVerificationToken = require("../../utils/generateVerificationToken");

async function signup(req, res) {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User with this email already exists",
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();

    const user = new User({
      email,
      password: hashedPassword,
      username,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 3600000, // Token expires in 1 hour
    });
    await user.save();

    //jwt token generation

    generateTokenAndSetCookie(res, user._id);
  } catch (err) {
    // console.error("Error in signup controller:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function login(req, res) {
  await res.send("login route");
}

async function logout(req, res) {
  await res.send("logout route");
}

module.exports = {
  signup,
  login,
  logout,
};
