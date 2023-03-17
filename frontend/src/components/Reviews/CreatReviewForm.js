import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


const CreateReviewForm = (spotId) => {
    const history = useHistory()
    const [review, setReview] = useState('')
    const [stars, setStars] = useState("")
    const [errors, setErrors] = useState("")

    useEffect(() => {
        const err = {}
        setErrors(err)

    }, [])

    const handleSubmit = async (e) => {
        console.log('handle submit running')
        e.preventDefault();


        setErrors({})
        history.push(`/spots/${spotId}`)
    }


    return (
        <div className="review-form">
            <h2>How was your stay?</h2>
            <form>
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
                    <input
                        type="textarea"
                        placeholder="Leave your review here..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                    Stars
                </label>
                <button disabled={Object.values(errors).length > 0} type="submit">Submit Your Review</button>
            </form>
        </div>
    )
}
export default CreateReviewForm;
