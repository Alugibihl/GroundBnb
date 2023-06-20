import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editReviewThunk } from "../../store/reviewReducer";
import StarsRatingInput from "./StarsRatingInput";
import './Reviews.css'
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { getSpotsDetail } from "../../store/spotsReducer";

const EditReviewForm = ({ review, spot }) => {
    const user = useSelector((state) => state.session)
    const dispatch = useDispatch()
    const [reviewDetails, setReviewDetails] = useState(review.review ? review.review : "")
    const [stars, setStars] = useState(review.stars ? review.stars : 0)
    const [errors, setErrors] = useState("")
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory()
    const { closeModal } = useModal();
    const ulRef = useRef();
    let spotId = spot.id
    console.log('spotId', spotId, 'user', user, "review", review)

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
        console.log('handle submit running')
        const reviewInfo = { spotId, reviewDetails, stars }
        return dispatch(editReviewThunk(reviewInfo))
            .then(dispatch(getSpotsDetail(spotId)))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    }
    const onChange = (number) => {
        setStars(parseInt(number));
    };
    return (
        <div className="review-form">
            <h2>How was your stay?</h2>
            <form onSubmit={handleSubmit}>
                {errors.review && <p className="errors">{errors.review}</p>}
                {errors.stars && <p className="errors">{errors.star}</p>}
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
                <button disabled={reviewDetails.length >= 10 && stars > 0 ? false : true} type="submit">Submit Your Review</button>
            </form>
        </div>
    )
}
export default EditReviewForm;
