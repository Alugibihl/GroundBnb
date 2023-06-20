import { NavLink } from 'react-router-dom';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSpots } from '../../store/spotsReducer'
import UsersReviewsModal from './UsersReviewsModal';
import './Reviews.css'
import OpenModalButton from '../OpenModalButton';
import EditReviewForm from './EditReviewForm';

const UsersReviews = ({ review }) => {
    const dispatch = useDispatch()
    const userSpots = useSelector((state) => state.spots)
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    useEffect(() => {
        dispatch(getUserSpots())
    }, [dispatch])

    let spots = Object.values(userSpots)
    let userSpot = spots.find((spot) => spot.id === review.spotId)
    console.log('spots', spots, userSpot)
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
    let date = (time) => {
        let updated = new Date(time)
        return updated
    }

    return (
        <>
            {
                < nav className='reviews-board'>
                    <NavLink to={`/reviews/${review.id}`}>
                        <div>{userSpot?.name}</div>
                        <div>{date(review.updatedAt).toLocaleString("en-US", { month: "long" })} {date(review.updatedAt).getFullYear()}</div>
                        <div className="review-description">{review.review}</div>
                    </NavLink>
                    <div >
                        <OpenModalButton buttonText="Update"
                            onButtonClick={closeMenu} modalComponent={<EditReviewForm review={review} spot={userSpot} />} />
                        <OpenModalButton buttonText="Delete"
                            onButtonClick={closeMenu} modalComponent={<UsersReviewsModal review={review} />} /> </div>
                </nav>
            }
        </>
    );
};

export default UsersReviews;
