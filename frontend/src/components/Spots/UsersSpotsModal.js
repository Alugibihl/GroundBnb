import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteSpot } from '../../store/spotsReducer';
import OpenModalButton from "../OpenModalButton";
import { getUserSpots } from "../../store/spotsReducer";

const UsersSpotsModal = () => {
    const spot = useSelector((state) => state.spots)
    const dispatch = useDispatch()
    const history = useHistory()
    console.log('in userspotsmodal', spot.id);
    useEffect(() => {
        dispatch(getUserSpots())
    }, [dispatch])

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
                <div className="cancel-button"><button >No (Keep Spot)</button></div>
            </div>
        </>
    )
}


export default UsersSpotsModal
