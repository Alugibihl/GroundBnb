import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../store/reviewReducer";
import StarsRatingInput from "./StarsRatingInput";
import './Reviews.css'
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

const CreateReviewForm = ({ spot }) => {
    const user = useSelector((state) => state.session)
    const dispatch = useDispatch()
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const [errors, setErrors] = useState("")
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory()
    const { closeModal } = useModal();
    const ulRef = useRef();
    let spotId = spot.id
    console.log('spotId', spotId, 'user', user)

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
        const reviewDetails = { spotId, review, stars }
        return dispatch(createReview(reviewDetails))
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
                <button disabled={review.length >= 10 && stars > 0 ? false : true} type="submit">Submit Your Review</button>
            </form>
        </div>
    )
}
export default CreateReviewForm;
