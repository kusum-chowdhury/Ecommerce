const express = require('express');
const router = express.Router();
const {isSeller}= require('../middlewares/auth');
const createProductController = require('../controllers/createProductController');
const {isAuthenticated} = require('../middlewares/auth');
const {getAllProducts, getSingleProduct} = require('../controllers/getProduct');


router.post('/create', isAuthenticated, isSeller, createProductController);
router.get('/get/:id', getSingleProduct);
router.get('/get/all', getAllProducts);

module.exports = router;