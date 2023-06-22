const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Booking, Spot, SpotImage, Review, ReviewImage, Sequelize, sequelize } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


router.delete('/:imageId', requireAuth, async (req, res) => {
    const image = await SpotImage.findByPk(req.params.imageId)
    if (!image) {
        return res.status(404).json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        })
    }
    const review = await Spot.findByPk(image.spotId)
    if (review.ownerId !== req.user.id) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }
    await image.destroy();
    res.status(200).json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})


module.exports = router;
