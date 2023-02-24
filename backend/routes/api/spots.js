const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Booking, Spot, SpotImage, Review, ReviewImage, Sequelize, sequelize } = require('../../db/models');
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

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isInt()
        .withMessage("Stars must be an integer from 1 to 5"),
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
    //console.log(ownerId)
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const spot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });
    //console.log(ownerId, address, city, state, country, lat, lng, name, description, price);

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
        }) //find the object you want at index, then the container, then the value
        spot.numReviews = reviewsBySpotCount[0].dataValues.numReviews
        let spotAvgReview = reviewsBySpot.toJSON().avgRating
        if (spotAvgReview) {
            spot.avgStarRating = spotAvgReview
        } else {
            spot.avgStarRating = "No Review Yet"
        }
        spot.Owners = spot.User
        delete spot.User
        // delete spot.SpotImages
        delete spot.Reviews
    }
    if (!spotsList.length) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    res.json(spotsList)
})
//adds an image to a spot based on id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const spotId = req.params.spotId
    const owner = await Spot.findByPk(spotId)
    if (!owner) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    if (req.user.id !== owner.ownerId) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }
    const { url, preview } = req.body
    const image = await SpotImage.create({ spotId, url, preview })
    const pic = image.toJSON()
    delete pic.spotId
    delete pic.createdAt
    delete pic.updatedAt
    res.json(pic)
})

router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    const updated = await Spot.findByPk(req.params.spotId)
    // console.log(req.user.id, 'next', updated.ownerId)
    if (req.user.id !== updated.ownerId) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }
    if (!updated) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    if (address !== undefined) { updated.address = address }
    if (city !== undefined) { updated.city = city }
    if (state !== undefined) { updated.state = state }
    if (country !== undefined) { updated.country = country }
    if (address !== undefined) { updated.address = address }
    if (city !== undefined) { updated.city = city }
    if (lat !== undefined) { updated.lat = lat }
    if (lng !== undefined) { updated.lng = lng }
    if (name !== undefined) { updated.name = name }
    if (description !== undefined) { updated.description = description }
    if (price !== undefined) { updated.price = price }
    //console.log(updated, updated.id, updated.spotId)
    await updated.save()
    res.json(updated)
})

router.delete('/:spotId', requireAuth, async (req, res) => {
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId)
    //console.log(spot)
    if (req.user.id !== spot.ownerId) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }
    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    await spot.destroy();
    res.status(200).json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

router.get('/:spotId/reviews', async (req, res) => {
    const reviews = await Review.findByPk(req.params.spotId, {
        include: [
            {
                model: User,
                attributes: { exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt'] }
            },
            {
                model: ReviewImage,
                attributes: { exclude: ['createdAt', 'updatedAt', 'reviewId'] }
            },
        ]
    })
    if (!reviews) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    res.json({ Reviews: reviews })
})

router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId, {
        include: [{ model: Review }]
    })
    const userId = req.user.id
    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    // console.log(spotId, userId, spot);
    const { review, stars } = req.body
    const reviews = await Review.create({ userId, spotId, review, stars })
    //console.log(spot.Reviews.toJSON())
    let reviewList = []
    for (let thing of spot.Reviews) {
        reviewList.push(thing.dataValues.userId);
    }
    for (let userCheck of reviewList) {
        if (userCheck === userId) {
            return res.status(403).json({
                "message": "User already has a review for this spot",
                "statusCode": 403
            })
        }
    }
    res.json(reviews)
})


router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const user = req.user.id
    const booking = await Booking.findByPk(req.params.spotId, {
        include: [
            {
                model: User,
                attributes: { exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt'] }
            }
        ],
    })

    if (!booking) {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    let bookings = booking.toJSON()
    if (user !== bookings.userId) {
        delete bookings.User
        delete bookings.id
        delete bookings.userId
        delete bookings.createdAt
        delete bookings.updatedAt
    }
    res.json({ Bookings: [bookings] })
})

// router.post('/:spotId/bookings', requireAuth, validateBooking, async (req, res) => {
//     const userId = req.user.id
//     const spotId = req.params.spotId
//     const spot = await Spot.findByPk(spotId)
//     if (!spot) {
//         return res.status(404).json({
//             "message": "Spot couldn't be found",
//             "statusCode": 404
//         })
//     }
//     if (spot.ownerId === userId) {
//         return res.status(400).json({
//             message: 'You own this property.'
//         })
//     }

//     const { startDate, endDate } = req.body
//     const booking = await Booking.create({ spotId, userId, startDate, endDate })


//     res.json(booking)
// })






module.exports = router;
