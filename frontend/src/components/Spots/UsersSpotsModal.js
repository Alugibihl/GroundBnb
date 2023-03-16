import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";
import { deleteSpot } from '../../store/spotsReducer';
import OpenModalButton from "../OpenModalButton";

const UsersSpotsModal = ({ spot }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();


    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    let deleter = () => {
        let current = '/spots/current'
        dispatch(deleteSpot(spot.id))
        history.push(current)
        closeMenu();
    };

    return (
        <>
        <OpenModalButton/>
        <div className="modalBackround">
            <div className="modalContainer">
                <div className="modal-title"></div><h2 >Confirm Delete</h2></div>
            <div className="modal-question">
                <p>Are you sure you want to remove this spot <br />
                    from the listings?</p></div>
            <div className="continue-button"><button onClick={deleter}>Yes (Delete Spot)</button></div>
            <div className="cancel-button"><button>No (Keep Spot)</button></div>
        </div>
        </>
    )
}


export default UsersSpotsModal
