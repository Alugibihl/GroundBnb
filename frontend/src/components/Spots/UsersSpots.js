import { NavLink, useHistory } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import DeleteSpotsModal from './DeleteSpotsModal';
import OpenModalButton from '../OpenModalButton';
import './Spots.css'
import { useSelector } from 'react-redux';


const UsersSpots = ({ spot }) => {
    const user = useSelector(state => state.session.user)
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
            {spot.ownerId !== user.id ? null :
                <div className='spot-holder'>
                    <nav className='spot-card'>
                        <NavLink to={`/spots/${spot.id}`}>
                            <img alt={spot.name} src={spot.previewImage}></img>
                            <div className='aligned'><div className='card-location'>{spot.city}, {spot.state}</div><div className='average-rating'>
                                <i className="fa-solid fa-star"></i>{spot.avgRating === 'New' ? 'New' : parseInt(spot.avgRating).toFixed(1)}</div><div>
                                </div>  </div> <div className='price'>${spot.price}.00 night</div>
                        </NavLink>
                        <div ><button onClick={updater}>Update</button>
                            <OpenModalButton buttonText='Delete'
                                onButtonClick={closeMenu} modalComponent={<DeleteSpotsModal spot={spot} />} /></div>
                    </nav>
                </div>
            } </>
    );
};

export default UsersSpots;
