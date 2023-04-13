const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Booking, Spot, SpotImage, Review, ReviewImage, Sequelize, sequelize } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isLength({ min: 2, max: 14 })
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isLength({ min: 2, max: 14 })
        .withMessage("Country is required"),
    check('lat')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isDecimal()
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isDecimal()
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isLength({ max: 49 })
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isLength({ min: 30 })
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
        .isIn([1, 2, 3, 4, 5])
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
]

router.get('/', async (req, res) => {
    let { page, size, maxLat, minLat, maxLng, minLng, maxPrice, minPrice } = req.query
    maxLat = parseInt(maxLat)
    minLat = parseInt(minLat)
    maxLng = parseInt(maxLng)
    minLng = parseInt(minLng)
    maxPrice = parseInt(maxPrice)
    minPrice = parseInt(minPrice)
    if (!page || isNaN(page)) page = 1
    if (!size || isNaN(size)) size = 20
    page = parseInt(page)
    size = parseInt(size)
    if (page >= 10) page = 10
    if (size >= 20) size = 20
    let pagination = {}
    let where = {}
    if (page >= 1 && size >= 1) {
        pagination.limit = size
        pagination.offset = size * (page - 1)
    }
    if (page <= 0) {
        return res.status(400).json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "page": "Page must be greater than or equal to 1",
            }
        })
    }
    if (size <= 0) {
        return res.status(400).json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "size": "Size must be greater than or equal to 1",
            }
        })
    }

    if (maxLat && typeof maxLat === 'number') {
        if (maxLat <= 90) {
            where.lat = { [Op.between]: [-90, maxLat] }
        }
        else {
            return res.status(400).json({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                    "maxLat": "Maximum latitude is invalid"
                }
            })
        }
    }
    if (minLat && typeof minLat === 'number') {
        if (minLat >= -90) {
            where.lat = { [Op.between]: [minLat, 90] }
        }
        else {
            return res.status(400).json({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                    "minLat": "Minimum latitude is invalid"
                }
            })
        }
    }
    if (maxLng && typeof maxLng === 'number') {
        if (maxLng <= 180) {
            where.lng = { [Op.between]: [-180, maxLng] }
        } else {
            return res.status(400).json({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                    "maxLng": "Maximum longitude is invalid",
                }
            })
        }
    }
    if (minLng && typeof minLng === 'number') {
        if (minLng >= -180) {
            where.lng = { [Op.between]: [minLng, 180] }
        }
        else {
            return res.status(400).json({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                    "minLng": "Minimum longitude is invalid"
                }
            })
        }
    }
    if (maxPrice && typeof maxPrice === 'number') {
        if (maxPrice >= 0) {
            where.price = { [Op.between]: [0, maxPrice] }
        } else {
            return res.status(400).json({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                    "minPrice": "Minimum price must be greater than or equal to 0",
                }
            })
        }
    }
    if (minPrice && typeof minPrice === 'number') {
        if (minPrice >= 0) {
            where.price = { [Op.between]: [minPrice, 10000] }
        } else {
            return res.status(400).json({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                    "minPrice": "Minimum price must be greater than or equal to 0",
                }
            })
        }
    }
    const spots = await Spot.findAll({
        include: [{ model: SpotImage }],
        where,
        ...pagination
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
            attributes: [[sequelize.fn('AVG', sequelize.col("stars")), "avgRating"]]
        })
        let spotAvgReviews = reviewsBySpot.toJSON().avgRating
        if (spotAvgReviews) {
            spot.avgRating = spotAvgReviews
        } else {
            spot.avgRating = "New"
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
    res.json({ Spots: spotsList, page, size })
})



router.post("/", requireAuth, validateSpot, async (req, res) => {
    const ownerId = req.user.id
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const spot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });

    return res.status(201).json(spot)
})


//get all spots of current user, if none exist, give an error
router.get('/current', requireAuth, async (req, res) => {
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [{ model: SpotImage }]
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
            attributes: [[sequelize.fn('AVG', sequelize.col("stars")), "avgRating"]]
        })

        let spotAvgReviews = reviewsBySpot.toJSON().avgRating
        if (spotAvgReviews) {
            let spotAvgReview = spotAvgReviews
            spot.avgRating = spotAvgReview
        } else {
            spot.avgRating = "New"
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
    // if (!spotsList.length) {
    //     return res.status(404).json({
    //         message: "Spot couldn't be found",
    //     })
    // }
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
            attributes: [[sequelize.fn('AVG', sequelize.col("stars")), "avgRating"]]
        })
        const reviewsBySpotCount = await Review.findAll({
            where: {
                spotId: spot.id
            },
            attributes: [[sequelize.fn('COUNT', sequelize.col("review")), "numReviews"]]
        }) //find the object you want at index, then the container, then the value
        spot.numReviews = reviewsBySpotCount[0].dataValues.numReviews
        let spotAvgReviews = reviewsBySpot.toJSON().avgRating
        if (spotAvgReviews) {
            let spotAvgReview = spotAvgReviews
            spot.avgStarRating = spotAvgReview
        } else {
            spot.avgStarRating = "New"
        }
        spot.Owner = spot.User
        delete spot.User
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
    if (!updated) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    if (req.user.id !== updated.ownerId) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
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

    await updated.save()
    res.json(updated)
})

router.delete('/:spotId', requireAuth, async (req, res) => {
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    if (req.user.id !== spot.ownerId) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }
    await spot.destroy();
    res.status(200).json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})
//should return the reviews for a spot based on a spotid
router.get('/:spotId/reviews', async (req, res) => {
    const spotId = req.params.spotId
    const reviews = await Review.findAll({
        where: { spotId: spotId },
        include: [
            {
                model: User,
                attributes: { exclude: ['email', 'hashedPassword', 'createdAt', 'updatedAt'] }
            },
            {
                model: ReviewImage,
                attributes: { exclude: ['createdAt', 'updatedAt', 'reviewId'] }
            },
        ]
    })

    if (!reviews.length) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    let spotsList = []
    let thing
    for (let spot of reviews) {
        thing = spot.toJSON()
        const thingSpotId = thing.id;
        const images = await SpotImage.findAll({
            where: { spotId: thing.spotId },
        })
        if (!images.length) {
            thing.previewImage = 'No preview image found'
            if (!spotsList.includes(thing)) {
                spotsList.push(thing)

            }
        }

        for (let image of images) {
            if (image.dataValues.preview === true) {

                thing.previewImage = image.dataValues.url
            }
            if (!thing.previewImage) {
                thing.previewImage = 'No preview image found'
            }
            if (!spotsList.includes(thing)) {

                spotsList.push(thing)

            }
        }
    }

    res.json({ Reviews: spotsList })

})

//should allow the creation of a valid review based on a spotid
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

    const { review, stars } = req.body
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
    const reviews = await Review.create({ userId, spotId, review, stars })

    res.json(reviews)
})

//should return all bookings of a spot with information based on user status
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const user = req.user.id
    const booking = await Booking.findAll({
        where: { spotId: req.params.spotId },
        include: [
            {
                model: User,
                attributes: { exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt'] }
            }
        ],
    })
    if (!booking.length) {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    let booked = []
    for (let myBooking of booking) {
        let booking = myBooking.toJSON()
        if (user !== booking.userId) {
            delete booking.User
            delete booking.id
            delete booking.userId
            delete booking.createdAt
            delete booking.updatedAt
        }
        booked.push(booking)
    }
    res.json({ Bookings: booked })
})

router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const userId = req.user.id
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId)
    const spotBookings = await Booking.findAll({
        where: {
            spotId: spotId
        }
    })

    if (spot.ownerId === userId) {
        return res.status(400).json({
            message: 'You own this property.'
        })
    }
    const { startDate, endDate } = req.body
    let bookingsList = []
    for (let bookings of spotBookings) {
        bookingsList.push(bookings.toJSON())
    }
    for (let books of bookingsList) {
        let bookedstart = new Date(books.startDate)
        let bookedStartTime = bookedstart.getTime()
        let bookedend = new Date(books.endDate)
        let bookedendTime = bookedend.getTime()

        let startingDate = new Date(startDate)
        let startingDateTime = startingDate.getTime()
        let endingDate = new Date(endDate)
        let endingDateTime = endingDate.getTime()
        let today = new Date()

        if (startingDateTime >= endingDateTime) {
            return res.status(400).json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                    "endDate": "endDate cannot come before startDate"
                }
            })
        }
        if (startingDateTime <= today) {
            return res.status(403).json({
                "message": "Past bookings can't be created",
                "statusCode": 403
            })
        }
        if (endingDateTime <= today) {
            return res.status(403).json({
                "message": "Past bookings can't be modified",
                "statusCode": 403
            })
        }
        if (bookedStartTime > startingDateTime && endingDateTime >= bookedendTime) {
            return res.status(403).json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": {
                    "startDate": "Start date conflicts with an existing booking",
                    "endDate": "End date conflicts with an existing booking"
                }
            })
        }
        if (startingDateTime === bookedStartTime || startingDateTime === bookedendTime || startingDateTime > bookedStartTime && startingDateTime < bookedendTime) {
            return res.status(403).json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": {
                    "startDate": "Start date conflicts with an existing booking",
                }
            })
        }
        if (endingDateTime === bookedStartTime && endingDateTime === bookedendTime || endingDateTime > bookedStartTime && endingDateTime < bookedendTime) {
            return res.status(403).json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": {
                    "endDate": "End date conflicts with an existing booking"
                }
            })
        }
    }
    const booking = await Booking.create({ spotId, userId, startDate, endDate })


    res.json(booking)
})






module.exports = router;
