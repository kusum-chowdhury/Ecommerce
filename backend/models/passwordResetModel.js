const {createDB} = require('../config/db')
const {DataTypes} = require('sequelize');

const PasswordReset = createDB.define('passwordReset', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Name of the User model
          key: 'id'
        }
      },
      resetToken: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
})

module.exports = PasswordReset