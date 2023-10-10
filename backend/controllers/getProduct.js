const Product = require('../models/productModel');

const getAllProducts = async(req, res)=> {
    const products = await Product.findAll();
    return res.status(200).json({
        products
    })
}

module.exports = {getAllProducts};