const {createDB} = require("../config/db");
const {DataTypes} = require('sequelize');
const CartItem = require('./cartItemModel');

const Cart = createDB.define('cart', {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      total_price: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
})
Cart.hasMany(CartItem, { foreignKey: 'cart_id' });

module.exports = Cart;