import { csrfFetch } from "./csrf";

const GET_USER_BOOKINGS = "bookings/CURRENT"
const CREATE_BOOKING = "bookings/NEW"
const EDIT_BOOKING = "bookings/EDIT"
const DELETE_BOOKING = "bookings/DELETE"

const editBooking = (booking) => {
    return {
        type: EDIT_BOOKING,
        booking
    }
}
const removeBooking = (bookingId) => {
    return {
        type: DELETE_BOOKING,
        bookingId
    }
}

const getUserBookings = (bookings) => {
    return {
        type: GET_USER_BOOKINGS,
        bookings
    }
}
const addBooking = (booking) => {
    return {
        type: CREATE_BOOKING,
        booking
    }
}

export const getUserBookingsThunk = () => async (dispatch) => {
    const response = await csrfFetch("/api/bookings/current")
    if (response.ok) {
        const bookings = await response.json()
        console.log("user bookings", bookings);
        dispatch(getUserBookings(bookings))
    }
}

export const createBookingThunk = (data) => async (dispatch) => {
    const { spotId, startDate, endDate } = data
    console.log('create booking thunk running')
    try {
        const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ startDate, endDate })
        })
        console.log("status", response);
        if (response.ok) {
            const booking = await response.json()
            console.log('this is returned booking in create booking thunk', booking)
            dispatch(addBooking(booking))
            return booking
        }
    } catch (e) {
        let data = await e.json();
        console.log("look at Eeeeeeeeeeeeeeeeeeeeee", data.message)
        if (data.errors) {
            return data.errors;
        }
    }
}

export const editReviewThunk = (datas) => async (dispatch) => {
    const { bookingId, data } = datas
    console.log('edit booking thunk running', datas, data, bookingId)
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const booked = await response.json()
    console.log('this is returned booking in edit a booking thunk', booked)
    dispatch(editBooking(booked))
    return booked
}

export const deleteReview = (bookingId) => async (dispatch) => {
    await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        }
    })
    dispatch(removeBooking(bookingId))
    return bookingId
}


const initialState = {}
const BookingReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_USER_BOOKINGS:
            newState = { ...state }
            console.log("hello", action.bookings.Bookings);
            action.bookings.Bookings.forEach(booking => newState[booking.id] = booking);
            return { ...newState }
        default:
            return state
    }
}

export default BookingReducer;
