import { useDispatch } from "react-redux";
import { deleteSpot } from '../../store/spotsReducer';
import OpenModalButton from "../OpenModalButton";


const UsersSpotsModal = ({ spot }) => {
    const dispatch = useDispatch()
    console.log('this is spot in modal', spot)

    let deleter = async () => {
        await dispatch(deleteSpot(spot.id))
    };

    return (
        <>
            <div className="modal-backround">
                <div className="modalContainer">
                    <div className="modal-title"></div><h2 >Confirm Delete</h2></div>
                <div className="modal-question">
                    <p>Are you sure you want to remove this <br /> spot
                        from the listings?</p></div>
                <div className="delete-buttons"> <div className="continue-button"><OpenModalButton onButtonClick={deleter} buttonText='Yes (Delete Spot)' /></div>
                    <div className="cancel-button"> <OpenModalButton buttonText='NO (Keep Spot)' />  </div></div>
            </div>
        </>
    )
}


export default UsersSpotsModal
