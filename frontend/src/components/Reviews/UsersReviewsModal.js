import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/reviewReducer";
import OpenModalButton from "../OpenModalButton";


const UsersReviewsModal = ({ review }) => {
    const dispatch = useDispatch()
    console.log('this is review in modal', review)

    let deleter = async () => {
        return dispatch(deleteReview(review.id))
    };

    return (
        <>
            <div className="modal-backround">
                <div className="modalContainer">
                    <div className="modal-title"></div><h2 >Confirm Delete</h2></div>
                <div className="modal-question">
                    <p>Are you sure you want to delete this review?</p></div>
                <div className="delete-buttons"> <div className="continue-button"><OpenModalButton onButtonClick={deleter} buttonText='Yes (Delete Review)' /></div>
                    <div className="cancel-button"> <OpenModalButton buttonText='NO (Keep Review)' />  </div></div>
            </div>
        </>
    )
}


export default UsersReviewsModal
