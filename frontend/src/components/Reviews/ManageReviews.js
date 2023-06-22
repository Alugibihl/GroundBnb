import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getReviewsbyUser } from '../../store/reviewReducer'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import UsersReviews from './UserReviews'
import './Reviews.css'

const ManageReviews = () => {
    const userReviews = useSelector((state) => state.reviews)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getReviewsbyUser())

    }, [dispatch])
    let reviews = Object.values(userReviews)
    if (!reviews) { return null }
    return (
        <div className='all-base'>
            <h4>Manage Reviews</h4>
            <ul className='spots-board'>
                {reviews.length ? reviews.map(review => (
                    <UsersReviews review={review} key={review.id} />
                )) : <button className="title-page-position"><NavLink className="new-spot-link" to={'/'}>Return Home</NavLink></button>
                }
            </ul>
        </div>
    )
}
export default ManageReviews;
