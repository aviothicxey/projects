require('dotenv').config();

//const { connect } = require('mongoose');
const app  = require('./src/app');
const PORT = require('./src/app').PORT;
const connectDB = require('./src/db/db');
connectDB();

app.listen(PORT, () =>{
      console.log("Server is running on port:", PORT);  
})
