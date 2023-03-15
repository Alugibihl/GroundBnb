import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getSpotsDetail } from '../../store/spotsReducer'

const SpotDetails = () => {
    console.log('spot detail component running')
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const spotsInfo = useSelector((state) => {
        console.log('spot detail useSelector running')
        return state.spots[spotId]
    })
    useEffect(() => {
        console.log('spot detail useeffect running')
        dispatch(getSpotsDetail(spotId))
    }, [dispatch, spotId])

    return (
        <>
            {spotsInfo?.name
                ? <div> < h3 className='spotName' >{spotsInfo?.name}</h3>
                    {console.log('spot detail beginning jsx running')}
                    <div className='subtitle'>{spotsInfo?.city}, {spotsInfo?.state}, {spotsInfo?.country}</div>
                    <div>{spotsInfo?.SpotImages?.map(image =>
                        <img key={image.id} alt={image.id} src={image.url}></img>
                    )}</div>
                    <div className='spot-host description-box'>Hosted by {spotsInfo?.Owner?.firstName} {spotsInfo?.Owner?.lastName}</div>
                    <div className='reserve-box'>${spotsInfo?.price}.00 night <i className="fa-solid fa-star">
                    </i>{spotsInfo?.avgStarRating} {spotsInfo?.numReviews} Reviews <button className='reserve-a-spot'>Reserve</button></div>
                </div>
                : (<div>Loading</div>)
            }
            {console.log('spot detail end jsx running')}

        </>
    )
}

export default SpotDetails
