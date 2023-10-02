const {Sequelize} = require("sequelize");

const createDB = new Sequelize("db", "user", "pass", {
    dialect: 'sqlite',
    host: './config/db.sqlite'
})

const connectDB = () => {
    createDB.sync().then(()=> {
        console.log('connected to db');
    }).catch((e)=> {
        console.log('db connection failed');
    })
}

module.exports = {createDB, connectDB}

const User = require('../models/userModel');
const PasswordReset = require('../models/passwordResetModel');

// Define associations
User.hasOne(PasswordReset);
PasswordReset.belongsTo(User);