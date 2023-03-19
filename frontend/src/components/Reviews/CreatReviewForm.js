import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReview } from "../../store/reviewReducer";
import StarsRatingInput from "./StarsRatingInput";

const CreateReviewForm = () => {
 
    const spots = useSelector((state) => state.spots)
    console.log('yeeeeeeeeeeeeeeeeeeeeee', spots)
    const history = useHistory()
    const dispatch = useDispatch()
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const [errors, setErrors] = useState("")
    const ulRef = useRef();
    const [showMenu, setShowMenu] = useState(false);
    const spotsId = Object.values(spots)
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
        setErrors(err)
    }, [])


    const handleSubmit = async (e) => {
        console.log('handle submit running')
        e.preventDefault();
        const reviewDetails = { spotId, review, stars }
        console.log(reviewDetails)
        const createdReview = await dispatch(createReview(reviewDetails))
        if (createdReview)
            setErrors({})
        // history.push('/reviews/current')
        closeMenu()
    }
    const onChange = (number) => {
        setStars(parseInt(number));
    };
    return (
        <div className="review-form">
            <h2>How was your stay?</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                 type="textarea"
                placeholder="Leave your review here..."
                    value={review}
             onChange={(e) => setReview(e.target.value)}
                 required
                    />
                </label>
                <label>
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
