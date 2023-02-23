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

//lookup user by username and/or email
//if i can find it, throw error for email or user accordingly rerurn
//if not proceed with signup
if (User.email) {
    return res.status(403).json({
        "message": "User already exists",
        "statusCode": 403,
        "errors": {
            "email": "User with that email already exists"
        }
    })
}
if (User.username) {
    return res.status(403).json({
        "message": "User already exists",
        "statusCode": 403,
        "errors": {
            "username": "User with that username already exists"
        }
    })
}
// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
        const { email, password, username, firstName, lastName } = req.body;
        const user = await User.signup({ email, username, password, firstName, lastName });
        await setTokenCookie(res, user);
        return res.json({
            user: user
        });
    }
);
// npm install &&
// npm run build &&
// npm run sequelize --prefix backend db:seed:undo:all &&
// npm run sequelize --prefix backend db:migrate:undo:all &&
// npm run sequelize --prefix backend db:migrate &&
// npm run sequelize --prefix backend db:seed:all




// npm install && npm run build && npm run sequelize --prefix backend db:migrate && npm run sequelize --prefix backend db:seed:all









module.exports = router;
