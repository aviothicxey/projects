const express = require('express');
const authRouter = require('./routes/auth.route');
const { cookie } = require('express-validator');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth' , authRouter);


app.get('/' , (req , res) =>{
    res.send('Aparna Garg');
});

module.exports = app;