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
    if (req.user.id !== owner.ownerId) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }

    const { url, preview } = req.body
    const image = await SpotImage.create({ spotId, url, preview })
    const pic = image.toJSON()
    console.log(pic)
    if (!spotId) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
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
    console.log(spot)
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







module.exports = router;
