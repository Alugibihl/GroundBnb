import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom'
import { getUserBookingsThunk } from "../../store/bookings";
import "./bookings.css";

const ManageBookings = () => {
    const userbookings = useSelector((state) => state.bookings)
    const bookings = Object.values(userbookings)
    const dispatch = useDispatch()
    console.log("in manage spot", userbookings, bookings)
    useEffect(() => {
        dispatch(getUserBookingsThunk())
    }, [dispatch])

    if (!userbookings) return null
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className='all-base'>
            {bookings.length > 0 && <h4 className="title-page-position">Your Bookings</h4>}
            <ul className='spots-board'>
                {bookings.length > 0 ? bookings.map(booking => (
                    <div className='spot-card' key={booking.id}>
                        <NavLink to={`/spots/${booking.Spot.id}`}>
                            <img alt={booking.Spot.name} src={booking.Spot.previewImage}></img>
                            <div className='aligner'><div className='card-location'>{booking.Spot.city}, {booking.Spot.state}</div>
                                <div className="dates-frame">
                                    <div>From: {formatDate(booking.startDate)}</div><div> To: {formatDate(booking.endDate)}</div></div>
                            </div>
                        </NavLink>
                        <div ></div>
                    </div>)) :
                    <div>
                        <h4>No Bookings Yet</h4>
                        <button className="title-page-position"><NavLink className="new-spot-link" to={'/'}>Find your next adventure!</NavLink></button>
                    </div>
                }
            </ul>
        </div>
    )
}

export default ManageBookings;
