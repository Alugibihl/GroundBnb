const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Booking, Spot, SpotImage, Review, ReviewImage, Sequelize, sequelize } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { json } = require('sequelize');


router.get('/current', requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        where: { userId: req.user.id },
        include: [
            {
                model: Spot,
                attributes: { exclude: ['createdAt', 'updatedAt', 'description'] }
            }
        ]
    })
    let spotsList = []
    let thing
    for (let spot of bookings) {
        thing = spot.toJSON()

        const spotId = thing.Spot.id;
        const images = await SpotImage.findAll({
            where: { spotId: spotId },
        })
        for (let image of images) {
            if (image.preview === true) {
                thing.Spot.previewImage = image.url
            }
            if (!bookings[0].Spot.previewImage) {
                thing.Spot.previewImage = 'No preview image found'
            }
            spotsList.push(thing)
        }
    }
    res.json({ 'Bookings': spotsList })
})



















router.delete('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId)
    if (!booking) {
        return res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }
    if (booking.userId !== req.user.id) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }
    await booking.destroy()
    res.status(200).json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})







module.exports = router;
