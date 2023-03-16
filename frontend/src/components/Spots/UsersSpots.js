import { useEffect, ulRef, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';

import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'

import './Spots.css'
import UsersSpotsModal from './UsersSpotsModal'

const UsersSpots = ({ spot }) => {

    const [showMenu, setShowMenu] = useState(false);
    const { closeModal } = useModal()
    const history = useHistory()
    const dispatch = useDispatch()


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

    let updater = () => {
        let update = `/spots/${spot.id}/edit`;
        history.push(update)
    }

    return (
        <>
            <nav className='spot-card'>
                <NavLink to={`/spots/${spot.id}`}>
                    <img alt={spot.name} src={spot.previewImage}></img>
                    <div className='aligned'><div className='card-location'>{spot.city}, {spot.state}</div><div className='average-rating'>
                        <i className="fa-solid fa-star"></i>{spot.avgRating}</div><div>
                        </div>  </div> <div className='price'>${spot.price}.00 night</div>
                </NavLink>
                <div ><button onClick={updater}>Update</button>
                    <OpenModalMenuItem spot={spot} itemText='Delete'
                        modalComponent={UsersSpotsModal} /></div>
            </nav>
        </>
    );
};

export default UsersSpots;
