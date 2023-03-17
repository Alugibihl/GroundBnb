import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { getSpotsDetail } from '../../store/spotsReducer'
import { getReviewsBySpot } from '../../store/reviewReducer'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import UsersReviewsModal from '../Reviews/UsersReviewsModal'

const SpotDetails = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const spotsInfo = useSelector((state) => state.spots[spotId])
    const spotReviews = useSelector((state) => state.reviews)
    const user = useSelector((state) => state.session)
    const ulRef = useRef();
    const reviewData = Object.values(spotReviews)
    const [showMenu, setShowMenu] = useState(false);
    useEffect(() => {
        dispatch(getSpotsDetail(spotId))
        if (spotId) {
            console.log('inside of the use effect!!!!!!!!!!!!!!!!11')
            dispatch(getReviewsBySpot(spotId))
        }
    }, [dispatch, spotId])
    console.log('spot reviews!!!!!!!!!!!!!!', spotReviews, reviewData)
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
    if (!reviewData) {
        return null
    }
    let date = (time) => {
        let updated = new Date(time)
        return updated
    }
    return (
        <>
            {spotsInfo?.name
                ? <div> < h3 className='spotName' >{spotsInfo?.name}</h3>
                    <div className='subtitle'>{spotsInfo?.city}, {spotsInfo?.state}, {spotsInfo?.country}</div>
                    <div>{spotsInfo?.SpotImages?.map(image =>
                        <img key={image.id} alt={image.id} src={image.url}></img>
                    )}</div>
                    <div className='spot-host description-box'><div>Hosted by {spotsInfo?.Owner?.firstName} {spotsInfo?.Owner?.lastName}</div>
                        <div>{spotsInfo?.description}</div> </div>
                    <div className='reserve-box'>${spotsInfo?.price}.00 night <i className="fa-solid fa-star">
                    </i>{spotsInfo?.avgStarRating}
                        <div> {spotsInfo?.numReviews === 1 ? "1 Review" : `${spotsInfo?.numReviews} reviews`}</div>
                        <button className='reserve-a-spot'>Reserve</button></div>
                    <div className='reviews-container'>
                        <div><i className="fa-solid fa-star">
                        </i>{spotsInfo?.avgStarRating}{spotsInfo?.numReviews === 0 ?  :}{spotsInfo?.numReviews === 1 ? "1 Review" : `${spotsInfo?.numReviews} reviews`}</div>
                        {reviewData?.map((review) => {
                            return <span key={review.id} > <div>{review.User.username}</div>
                                <div>{date(review.updatedAt).toLocaleString("en-US", { month: "long" })} {date(review.updatedAt).getFullYear()}</div>
                                <div>{review.review}</div>
                                {review.User.id === user.user.id ?
                                    < div >   <button>Update</button> <button><OpenModalMenuItem itemText='Delete'
                                        onItemClick={closeMenu} modalComponent={<UsersReviewsModal review={review} />} />
                                    </button></div> : null}
                            </span>
                        })}
                    </div></div>
                : (<div>Loading</div>)
            }
            {console.log('spot detail end jsx running')}

        </>
    )
}

export default SpotDetails
