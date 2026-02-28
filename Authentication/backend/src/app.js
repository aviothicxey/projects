const express = require("express");
const authRoutes = require("./routes/auth.route");


const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());



// app.get("/" , async(req,res) =>{
//     await res.send("hiii");
// })


app.use("/api/auth",authRoutes);







module.exports = {app, PORT};