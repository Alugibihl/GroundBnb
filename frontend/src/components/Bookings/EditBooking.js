import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { editBookingThunk } from "../../store/bookings";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const EditBookingModal = ({ booking, spot }) => {
    const user = useSelector(state => state.session.user)
    const userbookings = useSelector((state) => state.bookings)
    const bookings = Object.values(userbookings)
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [startDate, setStartDate] = useState(booking.startDate ? new Date(booking.startDate) : new Date());
    const [endDate, setEndDate] = useState(booking.endDate ? new Date(booking.endDate) : new Date());
    // const [startDate, setStartDate] = useState(booking.startDate ? booking.startDate : new Date());
    // const [endDate, setEndDate] = useState(booking.endDate ? booking.endDate : new Date());
    const history = useHistory()
    const [errors, setErrors] = useState({})
    console.log("booking", booking, "spot", spot);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookingData = {
            spotId: spot.id,
            startDate,
            endDate,
        };
        const info = { bookingId: booking.id, bookingData }
        console.log("bookingData", bookingData, "info", info);
        const data = await dispatch(editBookingThunk(info));
        if (!data.id && (data.startDate || data.endDate)) {
            setErrors(data);
        } else {
            closeModal();
            history.push("/bookings/current");
        }
    }

    const unavailable = bookings?.map(ele => ({ start: new Date(ele.startDate), end: new Date(ele.endDate) }));

    return (
        <div className="booking-form">
            <h2>Edit your Booking</h2>
            <form onSubmit={handleSubmit}>
                <div className="errors">{errors.startDate}</div>
                <div className="errors">{errors.endDate}</div>
                <div className="date-holder">
                    <div>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            excludeDateIntervals={unavailable}
                        />
                    </div>
                    <div>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            excludeDateIntervals={unavailable}
                        />
                    </div>
                </div>
                <div className="bookings-buttons">
                    <button onClick={closeModal}>Cancel</button>
                    <button type="submit">Edit Booking</button>
                </div>
            </form>
        </div>
    );
};

export default EditBookingModal;
