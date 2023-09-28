const User = require('../models/userModel');

const checkIfEmailExists = async (req, res, next) => {
    const {email} = req.body; 
     console.log(email);
    // Use your database query to check if the email exists
    // For example, if using Mongoose:
    const user = await User.findOne({where: {email}})
  
      if (user) {
        // If a user with this email already exists, respond with an error
        const error = new Error('Email already exists');
        error.statusCode = 400; // Set a custom status code if needed
        return next(error);
      }
  
      // If the email doesn't exist, proceed to the next middleware
      next();
  
  }

  module.exports = checkIfEmailExists