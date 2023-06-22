import { useDispatch } from "react-redux";
import { deleteSpot } from '../../store/spotsReducer';
import { useModal } from "../../context/Modal";


const DeleteSpotsModal = ({ spot }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    // console.log('this is spot in modal', spot)

    let deleter = async () => {
        await dispatch(deleteSpot(spot.id))
        closeModal()
    };

    return (
        <>
            <div className="modal-backround">
                <div className="modalContainer">
                    <div className="modal-title"></div><h2 >Confirm Delete</h2></div>
                <div className="modal-question">
                    <p>Are you sure you want to remove this <br /> spot
                        from the listings?</p></div>
                <div className="delete-buttons"> <div className="continue-button"><button onClick={deleter} >Yes (Delete Spot)</button></div>
                    <div className="cancel-button">  <button onClick={closeModal}>NO (Keep Spot) </button>  </div></div>
            </div>
        </>
    )
}


export default DeleteSpotsModal
