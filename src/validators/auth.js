const { check, validationResult } = require('express-validator')

exports.validateSignupRequest = [
    check('firstName')
        .notEmpty()
        .withMessage("First Name is required"),
    check('lastName')
        .notEmpty()
        .withMessage("Last name is required"),
    check('email')
        .isEmail()
        .withMessage("Valid Email is required"),
    check('password')
        .isLength({ min: 6 })
        .withMessage("Password must contains at least 6 character")

];
exports.validateSigninRequest = [
    check('email')
        .isEmail()
        .withMessage("Valid Email is required"),
    check('password')
        .isLength({ min: 6 })
        .withMessage("Password must contains at least 6 character")

];

exports.isRequestvalidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    next();
}
