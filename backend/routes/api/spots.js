const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, Sequelize, sequelize } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


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












module.exports = router;
