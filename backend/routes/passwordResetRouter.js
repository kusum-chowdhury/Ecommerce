const express = require('express');
const  PasswordResetController  = require('../controllers/passwordResetController');
const {passwordValidator} = require('../validators/validator')
const router = express.Router();

// router.post('/', PasswordResetController.completePasswordReset)
router.post('/initiate', PasswordResetController.initiatePasswordReset);
router.post('/complete', passwordValidator(), PasswordResetController.completePasswordReset);

module.exports = router;