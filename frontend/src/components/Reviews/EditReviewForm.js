import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editReviewThunk } from "../../store/reviewReducer";
import StarsRatingInput from "./StarsRatingInput";
import { useModal } from "../../context/Modal";
import { getSpotsDetail } from "../../store/spotsReducer";
import './Reviews.css'

const EditReviewForm = ({ review, spot }) => {
    const user = useSelector((state) => state.session)
    const dispatch = useDispatch()
    const [reviewDetails, setReviewDetails] = useState(review.review ? review.review : "")
    const [stars, setStars] = useState(review?.stars ? review?.stars : 0)
    const [errors, setErrors] = useState("")
    const [showMenu, setShowMenu] = useState(false);
    const { closeModal } = useModal();
    const ulRef = useRef();
    let spotId = spot.id

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


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { spotId: spotId, review: reviewDetails, stars: stars }
        const reviewInfo = { reviewId: review.id, data }
        const result = await dispatch(editReviewThunk(reviewInfo))
        if (result.errors) {
            const data = await result.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        }
        else {
            closeModal()
            await dispatch(getSpotsDetail(spot.id))
        }
    }

    const onChange = (number) => {
        setStars(parseInt(number));
    };

    return (
        <div className="review-form">
            <h2>How was your stay?</h2>
            <form onSubmit={handleSubmit}>
                {errors.review && <p className="errors">{errors.review}</p>}
                {errors.stars && <p className="errors">{errors.stars}</p>}
                <label>
                    <input
                        type="textarea"
                        placeholder="Leave your review here..."
                        value={reviewDetails}
                        onChange={(e) => setReviewDetails(e.target.value)}
                        required
                        minLength={2}
                        maxLength={240}
                    />
                </label>
                <label className="star-listing">
                    <StarsRatingInput disabled={false}
                        onChange={onChange} stars={stars} />
                    Stars
                </label>
                <button type="submit">Submit Your Review</button>
            </form>
        </div>
    )
}
export default EditReviewForm;
