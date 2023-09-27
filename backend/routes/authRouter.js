const express = require('express');
const router = express.Router();
const {registerController, loginController, logoutController} = require('../controllers/authController')
const {userValidationRules, validate} = require('../validators/validator')

//routers to handle authentications
router.post('/register', userValidationRules(), validate, registerController);
router.post('/login', loginController);
router.get('/logout', logoutController); 
  

module.exports = router;