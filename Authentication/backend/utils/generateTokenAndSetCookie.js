const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
        HTTPOnly: true, // prevents attacks like XSS
        secure: process.env.NODE_ENV === "production", // ensures cookie is sent over HTTPS in production
        sameSite: "strict", // helps prevent CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    })
}

module.exports = generateTokenAndSetCookie;