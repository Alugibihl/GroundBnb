import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../store/reviewReducer";
import StarsRatingInput from "./StarsRatingInput";
import './Reviews.css'
import { useHistory } from "react-router-dom";
const CreateReviewForm = () => {

    const spots = useSelector((state) => state.spots)
    const dispatch = useDispatch()
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const [errors, setErrors] = useState("")
    const ulRef = useRef();
    const [showMenu, setShowMenu] = useState(false);
    const spotsId = Object.values(spots)
    const history = useHistory()
    let spotId = spotsId[0].id
    console.log('spotsId', spotsId, 'spotId', spotId)
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

    useEffect(() => {
        const err = {}
        if (!review.length) { err.review = 'Review cannot be empty.' }
        if (stars < 1 || stars > 5) { err.stars = 'Review must be a number 1 through 5' }
        setErrors(err)
    }, [review, stars])


    const handleSubmit = async (e) => {
        console.log('handle submit running')
        e.preventDefault();
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
                {errors.review ? <p className="errors">{ }</p> : null}
                {errors.stars ? <p className="errors">{ }</p> : null}
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
