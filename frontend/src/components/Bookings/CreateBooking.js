import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';



const CreateBookingModal = ({ spot }) => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookingData = {
            spotId: spot.id,
            userId: user.id,
            startDate,
            endDate,
        };

        // dispatch()
        //     .then(() => {
        //         // Handle successful booking creation
        //         closeModal();
        //     })
        //     .catch((error) => {
        //         // Handle booking creation error
        //         console.log(error);
        //     });
    };

    return (
        <div className="booking-form">
            <h2>Create your Booking</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                    />
                </div>
                <div>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                    />
                </div>
                <div>
                    <button onClick={closeModal}>Cancel</button>
                    <button type="submit">Create Booking</button>
                </div>
            </form>
        </div>
    );
};

export default CreateBookingModal;
