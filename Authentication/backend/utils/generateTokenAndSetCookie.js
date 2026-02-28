const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
        HTTPOnly: true, // prevents attacks like XSS
        secure: process.env.NODE_ENV === "production", // ensures cookie is sent over HTTPS in production
        sameSite: "strict", // helps prevent CSRF attacks
    })
}