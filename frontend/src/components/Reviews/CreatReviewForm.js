import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../store/reviewReducer";
import StarsRatingInput from "./StarsRatingInput";
import './Reviews.css'
import { useHistory, useParams } from "react-router-dom";
const CreateReviewForm = () => {
    const user = useSelector((state) => state.session)
    const spots = useSelector((state) => state.spots)
    const dispatch = useDispatch()
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const [errors, setErrors] = useState("")
    const [showMenu, setShowMenu] = useState(false);
    const spotsId = Object.values(spots)
    const history = useHistory()
    const ulRef = useRef();
    let spotId = spotsId[0].id
    console.log('spotsId', spotsId, 'spotId', spotId, 'user', user, spotsId[spotId])
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

    // useEffect(() => {
    //     const err = {}
    //     if (!review.length) { err.review = 'Review cannot be empty.' }
    //     if (stars < 1 || stars > 5) { err.stars = 'Review must be a number 1 through 5' }
    //     if (user.user.id === spotsId[spotId].ownerId) { err.review = 'You cannot review your own property' }
    //     setErrors(err)
    // }, [review, stars, spotId, spotsId, user.user.id])


    const handleSubmit = async (e) => {
        console.log('handle submit running')
        e.preventDefault();
        if (!review.length) { errors.review = 'Review cannot be empty.' }
        if (stars < 1 || stars > 5) { errors.stars = 'Review must be a number 1 through 5' }
        if (user.user.id === spotsId[spotId].ownerId) { errors.review = 'You cannot review your own property' }
        const reviewDetails = { spotId, review, stars }
        console.log(reviewDetails)
        const createdReview = await dispatch(createReview(reviewDetails))
        if (createdReview)
            setErrors({})
        closeMenu()
        history.push('/reviews/current')

    }
    const onChange = (number) => {
        setStars(parseInt(number));
    };
    return (
        <div className="review-form">
            <h2>How was your stay?</h2>
            <form onSubmit={handleSubmit}>
                {errors.review ? <p className="errors">{errors.review}</p> : null}
                {errors.stars ? <p className="errors">{errors.star}</p> : null}

                <label>
                    <input
                        type="textarea"
                        placeholder="Leave your review here..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                </label>
                <label className="star-listing">
                    <StarsRatingInput disabled={false}
                        onChange={onChange} stars={stars} />
                    Stars
                </label>
                <button disabled={Object.values(errors).length > 0} type="submit">Submit Your Review</button>
            </form>
        </div>
    )
}
export default CreateReviewForm;
