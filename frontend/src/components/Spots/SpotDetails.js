import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getSpotsDetail } from '../../store/spotsReducer'

const SpotDetails = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const spotsInfo = useSelector((state) => state.spots[spotId])
    useEffect(() => {
        dispatch(getSpotsDetail(spotId))
    }, [dispatch, spotId])

    return (
        <>
            {spotsInfo?.name
                ? <div> < h3 className='spotName' >{spotsInfo?.name}</h3>
                    <div className='subtitle'>{spotsInfo?.city}, {spotsInfo?.state}, {spotsInfo?.country}</div>
                    <div>{spotsInfo?.SpotImages.forEach(image => {
                        <img alt={image.id} src={image.url}></img>
                    })}</div>
                    <div className='spot-host description-box'>Hosted by {spotsInfo?.Owner.firstName} {spotsInfo?.Owner.lastName}</div>
                    <div className='reserve-box'>${spotsInfo?.price}.00 night <i className="fa-solid fa-star"></i>{spotsInfo?.avgStarRating} {spotsInfo?.numReviews} Reviews <button className='reserve-a-spot'>Reserve</button></div>
                    <div className='spot-description description-box'>{spotsInfo?.description}</div>
                </div> : (<div>Loading</div>)
            }
        </>
    )
}

export default SpotDetails
