const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Booking, Spot, SpotImage, Review, ReviewImage, Sequelize, sequelize } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { json, DATE } = require('sequelize');


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

router.put('/:bookingId', requireAuth, async (req, res) => {
    const updatedBooking = await Booking.findByPk(req.params.bookingId)
    if (!updatedBooking) {
        return res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": 404,
            "errors": {
                "startDate": "No booking here..."
            }
        })
    }
    const spotBookings = await Booking.findAll({
        where: {
            spotId: updatedBooking.spotId
        }
    })
    if (req.user.id !== updatedBooking.userId) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403,
            "errors": {
                "startDate": "This isn't your booking",
            }
        })
    }
    const { startDate, endDate } = req.body
    // console.log("-----------------", startDate, endDate)
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

        if (startingDateTime > endingDateTime) {
            return res.status(400).json({
                "message": "Departure cannot be before arrival",
                "statusCode": 400,
                "errors": {
                    "startDate": "Checkin date must be before checkout date",
                }
            })
        }
        if (startingDateTime === endingDateTime) {
            return res.status(400).json({
                "message": "Bookings must be atleast 1 day.",
                "statusCode": 400,
                "errors": {
                    "startDate": "Start date is the same as end date",
                }
            })
        }
        if (startingDateTime < today) {
            return res.status(403).json({
                "message": "Past bookings can't be created",
                "statusCode": 403,
                "errors": {
                    "startDate": "All bookings must be made atleast 1 day in advance."
                }
            })
        }
        if (endingDateTime <= today) {
            return res.status(403).json({
                "message": "Past bookings can't be modified",
                "statusCode": 403,
                "errors": {
                    "endDate": "End date is in the past"
                }
            })
        }
        if (bookedStartTime > startingDateTime && endingDateTime >= bookedendTime) {
            return res.status(403).json({
                "message": `Sorry, this spot is unavailable for the specified dates until ${bookedendTime}`,
                "statusCode": 403,
                "errors": {
                    "startDate": "Start date conflicts with an existing booking",
                    "endDate": "End date conflicts with an existing booking"
                }
            })
        }
        if (startingDateTime === bookedStartTime || startingDateTime === bookedendTime || startingDateTime > bookedStartTime && startingDateTime < bookedendTime) {
            return res.status(403).json({
                "message": `Sorry, this spot is unavailable for the specified dates until ${bookedendTime}`,
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
        if (startDate !== undefined) {
            updatedBooking.startDate = new Date(startDate);
        }
        if (endDate !== undefined) {
            updatedBooking.endDate = new Date(endDate);
        }
    }
    await updatedBooking.save()
    res.json(updatedBooking)
})


module.exports = router;
