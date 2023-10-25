const {createDB} = require("../config/db");
const {DataTypes} = require('sequelize');
const Cart = require('./cartModel');

const CartItem = createDB.define('cart', {
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
});

CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });
module.exports = CartItem;