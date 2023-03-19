import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { getSpotsDetail } from '../../store/spotsReducer'
import { cleanUp, getReviewsBySpot } from '../../store/reviewReducer'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import UsersReviewsModal from '../Reviews/UsersReviewsModal'
import CreateReviewForm from '../Reviews/CreatReviewForm'

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

        dispatch(getReviewsBySpot(spotId))
        return () => dispatch(cleanUp())
    }, [dispatch, spotId])

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

    let date = (time) => {
        let updated = new Date(time)
        return updated
    }
    let reviewMadness = (reviewCount) => {
        if (reviewCount > 1) {
            return (<div>{reviewCount} Reviews</div>)
        } else if (reviewCount === 1) {
            return (<div>{reviewCount} Review</div>)
        } else {
            console.log('this is reviewcount', reviewCount)
            return (<div><button><OpenModalMenuItem itemText='Post Your Review'
                onItemClick={closeMenu} modalComponent={<CreateReviewForm />} /></button>
                <div>Be the first to post a review!</div></div>)
        }
    }
    return (
        <>
            {spotsInfo?.name
                ? <div> < h3 className='spotName' >{spotsInfo?.name}</h3>
                    <div className='subtitle'>{spotsInfo?.city}, {spotsInfo?.state}, {spotsInfo?.country}</div>
                    <div>{spotsInfo?.SpotImages?.map(image =>
                        <img key={image.id} alt={image.id} src={image.url}></img>
                    )}</div>
                    <div className='spot-host description-box'>
                        <div>Hosted by {spotsInfo?.Owner?.firstName} {spotsInfo?.Owner?.lastName}</div>
                        <div>{spotsInfo?.description}</div> </div>
                    <div className='reserve-box'>${spotsInfo?.price}.00 night <i className="fa-solid fa-star">
                    </i>{spotsInfo?.avgStarRating}
                        <div> {spotsInfo?.numReviews === 1 ? "1 Review" : `${spotsInfo} Reviews`}</div>
                        <button className='reserve-a-spot'>Reserve</button></div>
                    <div className='reviews-container'>
                        <div><i className="fa-solid fa-star">
                        </i>{spotsInfo?.avgStarRating}{reviewMadness(spotsInfo?.numReviews)}</div>
                        {reviewData?.map((review) => {
                            console.log(review)
                            return <span key={review.id} > <div>{review.User ? review.User.username : user.user.username}</div>
                                <div>{date(review.updatedAt).toLocaleString("en-US", { month: "long" })} {date(review.updatedAt).getFullYear()}</div>
                                <div>{review.review}</div>
                                {review.User?.id === user.user.id ?
                                    <div><button>Update</button> <button><OpenModalMenuItem itemText='Delete'
                                        onItemClick={closeMenu} modalComponent={<UsersReviewsModal review={review} />} />
                                    </button></div> : null}
                                <button><OpenModalMenuItem itemText='Post Your Review'
                                    onItemClick={closeMenu} modalComponent={<CreateReviewForm closeMenu={closeMenu} spotId={review?.id} />} /></button>
                            </span>

                        })}
                    </div>

                </div>
                : (<div>Loading</div>)
            }
            {console.log('spot detail end jsx running')}

        </>
    )
}

export default SpotDetails
