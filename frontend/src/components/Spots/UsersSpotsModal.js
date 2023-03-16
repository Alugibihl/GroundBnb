import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteSpot } from '../../store/spotsReducer';
import OpenModalButton from "../OpenModalButton";

const UsersSpotsModal = () => {
    const spot = useSelector((state) => state.spot)
    const dispatch = useDispatch()
    const history = useHistory()

    let deleter = () => {
        let current = '/spots/current'
        dispatch(deleteSpot(spot.id))
        history.push(current)
    };


    return (
        <>
            <OpenModalButton />
            <div className="modalBackround">
                <div className="modalContainer">
                    <div className="modal-title"></div><h2 >Confirm Delete</h2></div>
                <div className="modal-question">
                    <p>Are you sure you want to remove this spot <br />
                        from the listings?</p></div>
                <div className="continue-button"><button onClick={deleter}>Yes (Delete Spot)</button></div>
                <div className="cancel-button"><button onClick={}>No (Keep Spot)</button></div>
            </div>
        </>
    )
}


export default UsersSpotsModal
