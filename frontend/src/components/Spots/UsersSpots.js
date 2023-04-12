import { NavLink, useHistory } from 'react-router-dom';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import { useState, useRef, useEffect } from 'react';
import UsersSpotsModal from './UsersSpotsModal'
import './Spots.css'

const UsersSpots = ({ spot }) => {
    const history = useHistory()
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
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
                        <i className="fa-solid fa-star"></i>{spot.avgRating === 'New' ? 'New' : parseInt(spot.avgRating).toFixed(1)}</div><div>
                        </div>  </div> <div className='price'>${spot.price}.00 night</div>
                </NavLink>
                <div ><button onClick={updater}>Update</button>
                    <button><OpenModalMenuItem itemText='Delete'
                        onItemClick={closeMenu} modalComponent={<UsersSpotsModal spot={spot} />} /> </button></div>
            </nav>
        </>
    );
};

export default UsersSpots;
