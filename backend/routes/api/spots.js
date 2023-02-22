const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, Sequelize, sequelize } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Country is required"),
    check('lat')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isLength({ max: 49 })
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isNumeric()
        .withMessage("Price per day is required"),
    handleValidationErrors
]

// to make a route, add the files above and at the bottom
// add to index at the top and as middleware
router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        include: [
            {
                model: SpotImage,
            },
        ]
    })
    let spotsList = []
    for (let spot of spots) {
        spotsList.push(spot.toJSON())
    }
    for (let spot of spotsList) {
        // find avgRating
        const reviewsBySpot = await Review.findOne({
            where: {
                spotId: spot.id
            },
            attributes: {
                include: [
                    [sequelize.fn('AVG', sequelize.col("stars")), "avgRating"]
                ]
            }
        })
        // console.log(reviewsBySpot.toJSON())
        let spotAvgReview = reviewsBySpot.toJSON().avgRating
        if (spotAvgReview) {
            spot.avgRating = spotAvgReview
        } else {
            spot.avgRating = "No Review Yet"
        }
        spot.avgRating
        for (let image of spot.SpotImages) {
            if (image.preview === true) {
                spot.previewImage = image.url
            }
        }
        if (!spot.previewImage) {
            spot.previewImage = 'No preview image found'
        }
        delete spot.SpotImages
        delete spot.Reviews
    }
    res.json(spotsList)
})

router.post("/", requireAuth, validateSpot, async (req, res) => {
    // const { id } = req.params.id
    const ownerId = req.user.id
    console.log(ownerId)
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const spot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });
    console.log(ownerId, address, city, state, country, lat, lng, name, description, price);

    return res.status(201).json(spot)
}
)


//get all spots of current user, if none exist, give an error
router.get('/current', requireAuth, async (req, res) => {
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [
            {
                model: SpotImage,
            },
        ]
    })
    let spotsList = []
    for (let spot of spots) {
        spotsList.push(spot.toJSON())
    }
    for (let spot of spotsList) {
        // find avgRating
        const reviewsBySpot = await Review.findOne({
            where: {
                spotId: spot.id
            },
            attributes: {
                include: [
                    [sequelize.fn('AVG', sequelize.col("stars")), "avgRating"]
                ]
            }
        })
        // console.log(reviewsBySpot.toJSON())
        let spotAvgReview = reviewsBySpot.toJSON().avgRating
        if (spotAvgReview) {
            spot.avgRating = spotAvgReview
        } else {
            spot.avgRating = "No Review Yet"
        }
        spot.avgRating
        for (let image of spot.SpotImages) {
            if (image.preview === true) {
                spot.previewImage = image.url
            }
        }
        if (!spot.previewImage) {
            spot.previewImage = 'No preview image found'
        }
        delete spot.SpotImages
        delete spot.Reviews
    }
    if (!spotsList.length) {
        return res.status(404).json({
            message: "Spot couldn't be found",
        })
    }
    res.json({ "spots": spotsList })
})


//get the spot by id, if none exist, give an error
router.get('/:spotId', async (req, res) => {
    const spots = await Spot.findAll({
        where: {
            id: req.params.spotId,
        },
        include: [
            {
                model: SpotImage,
                attributes: { exclude: ['spotId', 'createdAt', 'updatedAt'] }
            },
            {
                model: User,
                attributes: { exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt'] }
            },
        ]
    })
    let spotsList = []
    for (let spot of spots) {
        spotsList.push(spot.toJSON())
    }
    for (let spot of spotsList) {
        const reviewsBySpot = await Review.findOne({
            where: {
                spotId: spot.id
            },
            attributes: {
                include: [
                    [sequelize.fn('AVG', sequelize.col("stars")), "avgRating"]
                ]
            }
        })
        const reviewsBySpotCount = await Review.findAll({
            where: {
                spotId: spot.id
            },
            attributes: {
                include: [
                    [sequelize.fn('COUNT', sequelize.col("review")), "numReviews"]
                ]
            }
        })
        //find the object you want at index, then the container, then the value
        spot.numReviews = reviewsBySpotCount[0].dataValues.numReviews
        let spotAvgReview = reviewsBySpot.toJSON().avgRating
        if (spotAvgReview) {
            spot.avgStarRating = spotAvgReview
        } else {
            spot.avgStarRating = "No Review Yet"
        }
        if (spots.User) {
            spots.owner = spots.User
        }
        delete spot.Users
        // delete spot.SpotImages
        delete spot.Reviews
    }
    if (!spotsList.length) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }


    res.json(spotsList[0])
})










module.exports = router;
