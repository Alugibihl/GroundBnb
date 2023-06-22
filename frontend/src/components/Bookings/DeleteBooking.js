import { useDispatch } from "react-redux";
import { deleteBookingThunk } from "../../store/bookings";
import { useModal } from "../../context/Modal";


const DeleteBookingModal = ({ booking }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    console.log('this is booking in modal', booking)

    let deleter = async () => {
        await dispatch(deleteBookingThunk(booking.id))
        closeModal()
    };

    return (
        <>
            <div className="modal-backround">
                <div className="modalContainer">
                    <div className="modal-title"></div><h2 >Confirm Delete</h2></div>
                <div className="modal-question">
                    <p>Are you sure you want to delete this Booking?</p></div>
                <div className="delete-buttons"> <div className="continue-button"><button onClick={deleter} >Yes (Delete Review)' </button></div>
                    <div className="cancel-button">
                        <button onClick={closeModal}>NO (Keep Booking) </button>  </div>
                </div ></div>
        </>
    )
}


export default DeleteBookingModal
