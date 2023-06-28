import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { editBookingThunk, getUserBookingsThunk } from "../../store/bookings";


const EditBookingModal = ({ booking, spot }) => {
    const user = useSelector(state => state.session.user)
    const userbookings = useSelector((state) => state.bookings)
    const bookings = Object.values(userbookings)
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [startDate, setStartDate] = useState(booking.startDate ? new Date(booking.startDate) : new Date());
    const [endDate, setEndDate] = useState(booking.endDate ? new Date(booking.endDate) : new Date());
    const [errors, setErrors] = useState({})


    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookingData = {
            spotId: spot.id,
            startDate: startDate.toISOString().split("T")[0],
            endDate: endDate.toISOString().split("T")[0],
        };
        const info = { bookingId: booking.id, bookingData }
        const data = await dispatch(editBookingThunk(info));
        if (data.errors) {
            setErrors(data.errors);
        } else {
            closeModal();
            await dispatch(getUserBookingsThunk())
        }
    }

    const unavailable = bookings?.map(ele => ({ start: new Date(ele.startDate), end: new Date(ele.endDate) }));

    return (
        <div className="booking-form">
            <h2>Edit your Booking</h2>
            <form onSubmit={handleSubmit}>
                {errors.startDate && <div className="errors">{errors.startDate}</div>}
                {errors.endDate && < div className="errors">{errors.endDate}</div>}
                <div className="date-holder">
                    <div>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            excludeDateIntervals={unavailable}
                            minDate={new Date()}
                        />
                    </div>
                    <div>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            excludeDateIntervals={unavailable}
                            minDate={new Date()}
                        />
                    </div>
                </div>
                <div className="bookings-buttons">
                    <button onClick={closeModal}>Cancel</button>
                    <button type="submit">Edit Booking</button>
                </div>
            </form >
        </div >
    );
};

export default EditBookingModal;
