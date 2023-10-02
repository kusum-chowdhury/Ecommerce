require('dotenv').config();
const express = require('express');
const {connectDB} = require('./config/db');
const ErrorHandler = require('./middlewares/errorHandler');
//import routes file
const authRouter = require('./routes/authRouter');
const passwordResetRouter = require('./routes/passwordResetRouter');
const app = express();
const PORT = 3000;


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Use the routers in the application
app.use('/auth', authRouter);
app.use('/password-reset', passwordResetRouter)
// ERROR HANDLER MIDDLEWARE (Last middleware to use)
app.use(ErrorHandler)

app.listen(PORT, ()=> {
    console.log('server is running');
    connectDB();
})