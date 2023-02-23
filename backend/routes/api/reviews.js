const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Sequelize, sequelize } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



router.get('/current', requireAuth, async (req, res) => {

    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: { exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt'] }
            },
            {
                model: Spot,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            },
            {
                model: ReviewImage,
                attributes: { exclude: ['createdAt', 'updatedAt', 'reviewId'] }
            },
        ]
    })
    res.json({ Reviews: reviews })
})

















module.exports = router;
