import { NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import EditReviewForm from './EditReviewForm';
import { getReviewsbyUser } from '../../store/reviewReducer';
import { getSpots } from '../../store/spotsReducer';
import ReviewDeleteModal from './DeleteReview';
import './Reviews.css'

const UsersReviews = ({ review }) => {
    const dispatch = useDispatch()
    const userSpots = useSelector((state) => state.spots)
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    useEffect(() => {
        dispatch(getReviewsbyUser())
        dispatch(getSpots())
    }, [dispatch])
    let spots = Object.values(userSpots)
    let userSpot = spots?.find((spot) => spot.id === review.spotId)
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

    if (!userSpots) return null

    return (
        <>
            {
                < nav className='reviews-board'>
                    <NavLink to={`/spots/${review.spotId}`}>
                        <div className='card-title'>{userSpot?.name}</div>
                        <div className='card-desc'>{date(review.updatedAt).toLocaleString("en-US", { month: "long" })} {date(review.updatedAt).getFullYear()}</div>
                        <div className="review-description wrap-break">{review.review}</div>
                    </NavLink>
                    <div className='box-buttons'>
                        <OpenModalButton buttonText="Update"
                            onButtonClick={closeMenu} modalComponent={<EditReviewForm review={review} spot={userSpot} />} />
                        <OpenModalButton buttonText="Delete"
                            onButtonClick={closeMenu} modalComponent={<ReviewDeleteModal review={review} />} /> </div>
                </nav>
            }
        </>
    );
};

export default UsersReviews;
