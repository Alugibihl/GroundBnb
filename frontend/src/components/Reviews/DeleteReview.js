import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/reviewReducer";
import { useModal } from "../../context/Modal";


const ReviewDeleteModal = ({ review }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    let deleter = async () => {
        await dispatch(deleteReview(review.id))
        closeModal()
    };

    return (
        <>
            <div className="modal-backround">
                <div className="modalContainer">
                    <div className="modal-title"></div><h2 >Confirm Delete</h2></div>
                <div className="modal-question">
                    <p>Are you sure you want to delete this review?</p></div>
                <div className="delete-buttons"> <div className="continue-button"><button onClick={deleter} >Yes (Delete Review)</button></div>
                    <div className="cancel-button">
                        <button onClick={closeModal}>NO (Keep Review) </button>  </div></div>
            </div>
        </>
    )
}


export default ReviewDeleteModal
