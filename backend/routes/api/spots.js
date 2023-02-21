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
            {
                model: Review,
                attributes: {
                    include: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']]
                }
            }
        ]


    })
    let spotsList = []
    spots.forEach(spot => {
        spotsList.push(spot.toJSON())
    });
    spotsList.forEach(spot => {
        spot.SpotImages.forEach(image => {

            if (image.preview === true) {
                spot.previewImage = image.url
            }
        })
        if (!spot.previewImage) {
            spot.previewImage = 'No preview image found'
        }

        // spot.Reviews.forEach(review => {
        //     [sequelize.fn("AVG", sequelize.col('stars')), 'avgRating']




        // })
        delete spot.SpotImages
        //delete spot.Reviews
    })

    res.json(spotsList)
})












module.exports = router;
