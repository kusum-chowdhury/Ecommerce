const Product = require('../models/productModel');
const upload = require('../utils/fileUpload');
const path = require('path');

const createProductController = async(req, res)=> {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).send({err: err.message});
        }
    
        if(!req.body.name || !req.body.price || !req.body.description || !req.file) {
          return res
            .status(400)
            .json({ err: "All fields should be selected - name, price, file" });
        }
    
        if (isNaN(req.body.price)) {
          return res.status(400).json({ err: "Price must be a number" });
        }
    
        let productDetails = {
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          image: req.file.path,
        };

        const createdProduct = await Product.create(productDetails);
        return res.status(201).json({ message: "Product created" });
      });
}

module.exports = createProductController