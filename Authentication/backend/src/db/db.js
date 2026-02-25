const mongoose = require("mongoose");


async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB is connected");
    } catch(error){
        console.log("Error connecting to DB", error);
    }
}



module.exports = connectDB;