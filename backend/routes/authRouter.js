const express = require('express');
const router = express.Router();
const registerController = require('../controllers/authController')
const {userValidationRules, validate} = require('../validators/validator')


router.post('/register', userValidationRules(), validate, registerController);
// router.post('/login', loginController);

module.exports = router;