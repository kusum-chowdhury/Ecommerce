const Product = require('../models/productModel');

const getAllProducts = async(req, res)=> {
    const products = await Product.findAll();
    return res.status(200).json({
        products
    })
}
const getSingleProduct = async(req, res)=> {
    const id = req.params.id;
    const product = await Product.findOne({where: {id}});
    return res.status(200).json({
        product
    })
}

module.exports = {getAllProducts, getSingleProduct};