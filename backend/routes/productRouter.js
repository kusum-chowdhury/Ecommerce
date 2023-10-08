const express = require('express');
const router = express.Router();
const {isSeller}= require('../middlewares/auth');
const createProductController = require('../controllers/createProductController');
const {isAuthenticated} = require('../middlewares/auth');

router.post('/create', isAuthenticated, isSeller, createProductController);


module.exports = router;