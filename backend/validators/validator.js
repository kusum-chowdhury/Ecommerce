const { body, validationResult } = require('express-validator');
const User = require('../models/userModel')

//user validator function
const userValidationRules = () => {
  return [
    //check if email already exists
    body('email').custom(async value => {
        const user = await User.findOne({
            where: {value}
        });
        if (user) {
        throw new Error('E-mail already in use');
        }
    }),

    //name should be 5 character long
    body('name').not().isEmpty()
    .withMessage('name can not be empty!')
    .bail()
    .isLength({ min: 5 })
    .withMessage('name should be 5 character long')
    .bail(),

    // username must be an email
    body('email')
    .not()
    .isEmpty()
    .withMessage('email can not be empty!')
    .bail().isEmail()
    .not().withMessage('invalid email')
    .bail(),

    // password must be at least 5 chars long
    body('password').not().isEmpty()
    .withMessage('password can not be empty!')
    .bail().isLength({ min: 6 })
    .withMessage('passowrd should be 6 character long')
    .bail(),
  ]
}

//look for error and show it
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  validate,
}