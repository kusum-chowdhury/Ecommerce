const nodemailer = require('nodemailer');
const PasswordReset = require('../models/passwordResetModel')
const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel')
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt')
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

const PasswordResetController = {
  initiatePasswordReset: async (req, res) => {
   // user provides their email for the reset
    const { email } = req.body; 
    // Check if the user exists and generate a reset token
    const emailExists = await User.findOne({where: {email}});
    if(!emailExists){
        return res.status(200).send('ok');
    }
    
    //create token and link
    const resetToken = uuidv4();
    const resetLink = `https://localhost:3000/password-reset/complete?token=${resetToken}`;

    // Send the reset token to the user (e.g., via email)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL,
        pass: PASSWORD
      }
      });

      const mailOptions = {
        from: 'kusumchowdhary@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: `To reset your password, use the following link: ${resetLink}`
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });      

    // Create a new row in the PasswordReset table
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);

    const createdToken = await PasswordReset.create({
        userId: emailExists.id,
        resetToken,
        expiresAt: expirationTime
    })
   return res.status(200).json({"message": "reset password link is sent to your email"})
  },

  completePasswordReset:  async (req, res) => {
    console.log('password reset')
    const { token } = req.query; // Extract token from URL parameter
    const { newPassword } = req.body; // Get new password from request body
    // Validate the token (check if it exists and is not expired)
    const resetRequest = await PasswordReset.findOne({
      where: {
        resetToken: token,
        expiresAt: { [Sequelize.Op.gt]: new Date() } // Check if expiresAt is in the future
      }
    });

    if (!resetRequest) {
      return res.status(400).json({'message': 'Invalid or expired token'});
    }

    // Find the associated user and update their password
    const user = await User.findByPk(resetRequest.userId);
    console.log(user);
    if (!user) {
      return res.status(400).send('User not found');
    }

    // Hash the newPassword
    const hashedPassword = await bcrypt.hash(newPassword, (saltOrRounds = 10));
    user.password = hashedPassword;
    await user.save();

    // Expire or delete the reset token
    await resetRequest.destroy();
    return res.status(200).send('Password reset successful');
  }
};


module.exports = PasswordResetController;