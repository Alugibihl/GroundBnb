import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import UsersReviews from './UsersReviews'
import { getReviewsbyUser } from '../../store/reviewReducer'
import './Reviews.css'

const ManageReviews = () => {
    const userReviews = useSelector((state) => state.reviews)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getReviewsbyUser())

    }, [dispatch])
    console.log("fish", userReviews);
    let reviews = Object.values(userReviews)
    if (!reviews.length) { return null }
    return (
        <div>
            <h4>Manage Reviews</h4>
            <ul className='spots-board'>
                {reviews !== null ? reviews.map(review => (
                    <UsersReviews review={review} key={review.id} />
                )) : null
                }
            </ul>
        </div>
    )
}
export default ManageReviews;
