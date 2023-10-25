const {DataTypes} = require('sequelize');
const {createDB} = require('../config/db');

const Product = createDB.define("product", {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
});

module.exports = Product