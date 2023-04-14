// backend/routes/api/users.js
const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage("First Name is required"),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage("Last Name is required"),
    handleValidationErrors
];

router.post(
    '/',
    validateSignup,
    async (req, res) => {
        const { email, password, username, firstName, lastName } = req.body;
        let user
        try {
            user = await User.signup({ email, username, password, firstName, lastName });
            await setTokenCookie(res, user);
        }
        catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                switch (err.errors[0].path) {
                    case 'username': return res.status(403).json({
                        "message": "User already exists",
                        "statusCode": 403,
                        "errors": {
                            "username": "Username must be unique"
                        }
                    })
                    case 'email': return res.status(403).json({
                        "message": "User already exists",
                        "statusCode": 403,
                        "errors": {
                            "email": "User with that email already exists"
                        }
                    })
                    default: return res.status(403).json({
                        "message": "Uniqueness constraint failed",
                        "statusCode": 403,
                        "Error": 'Uniqueness failed'
                    })
                }

            }
        }

        return res.json({
            user: user
        });
    }

);


module.exports = router;
