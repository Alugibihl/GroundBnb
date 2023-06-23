const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, ReviewImage, Sequelize, sequelize } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateReviews = [
    check('review')
        .exists({ checkFalsy: true })
        .isLength({ min: 2, max: 240 })
        .notEmpty()
        .withMessage("Review must be between 2 and 240 characters"),
    check('stars')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isInt()
        .isIn([1, 2, 3, 4, 5])
        .withMessage("Star Rating Required"),
    handleValidationErrors
]

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
                attributes: { exclude: ['description', 'createdAt', 'updatedAt'] }
            },
            {
                model: ReviewImage,
                attributes: { exclude: ['createdAt', 'updatedAt', 'reviewId'] }
            },
        ]
    })
    let spotsList = []
    let thing
    for (let spot of reviews) {
        thing = spot.toJSON()

        const spotId = thing.Spot.id;
        const images = await SpotImage.findAll({
            where: { spotId: spotId },
        })
        for (let image of images) {
            if (image.dataValues.preview === true) {

                thing.Spot.previewImage = image.dataValues.url
            }
            if (!thing.Spot.previewImage) {
                thing.Spot.previewImage = 'No preview image found'
            }
            if (!spotsList.includes(thing)) {
                spotsList.push(thing)
            }
        }
    }

    res.json({ Reviews: spotsList })
})


router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const reviewId = req.params.reviewId
    const review = await Review.findByPk(reviewId)
    if (!review) {
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }
    if (req.user.id !== review.userId) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }
    const totalImages = await ReviewImage.findAll({
        where: {
            reviewId: reviewId
        },
    })

    let picList = []
    for (let images of totalImages) {

        picList.push(images.toJSON())
    }
    if (picList.length >= 10) {
        res.status(403).json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
        })
    }
    const { url } = req.body
    const images = await ReviewImage.create({ reviewId, url })
    pic = images.toJSON()
    delete pic.reviewId
    delete pic.createdAt
    delete pic.updatedAt
    res.json(pic)
})

router.put('/:reviewId', requireAuth, validateReviews, async (req, res) => {
    const updated = await Review.findByPk(req.params.reviewId)
    if (!updated) {
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }
    if (req.user.id !== updated.userId) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }
    const { review, stars } = req.body
    if (review) updated.review = review
    if (stars) updated.stars = stars
    await updated.save()
    res.json(updated)
})

router.delete('/:reviewId', requireAuth, async (req, res) => {

    const rottenReview = await Review.findByPk(req.params.reviewId)
    if (!rottenReview) {
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }
    if (req.user.id !== rottenReview.userId) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }
    await rottenReview.destroy()
    res.status(200).json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})





module.exports = router;
