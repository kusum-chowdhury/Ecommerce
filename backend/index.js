const express = require('express');
const app = express();
const {connectDB} = require('./config/db')
//import routes file
const authRouter = require('./routes/authRouter');
const PORT = 3000;


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Use the routers in the application
app.use('/auth', authRouter);


app.listen(PORT, ()=> {
    console.log('server is running');
    connectDB();
})