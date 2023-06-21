import { csrfFetch } from "./csrf";

const GET_USER_BOOKINGS = "bookings/CURRENT"

const getUserBookings = (bookings) => {
    return {
        type: GET_USER_BOOKINGS,
        bookings
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
