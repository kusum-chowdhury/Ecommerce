const express = require('express');
const router = express.Router();
const {registerController, loginController, logoutController} = require('../controllers/authController')
const {userValidationRules, validate} = require('../validators/validator');
const checkIfEmailExists = require('../middlewares/emailExistsMiddleware.js')

//routers to handle authentications
router.post('/register',checkIfEmailExists, userValidationRules(), validate, registerController);
router.post('/login', loginController);
router.get('/logout', logoutController); 
  

module.exports = router;