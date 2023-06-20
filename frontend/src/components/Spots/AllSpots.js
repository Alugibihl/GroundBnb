import { useSelector, useDispatch } from 'react-redux'
import { getSpots } from '../../store/spotsReducer'
import { useEffect } from 'react'
import SingleSpot from './Spot'
import './Spots.css'

const AllSpots = () => {
    const spotsInfo = useSelector((state) => state.spots)
    const dispatch = useDispatch()
    useEffect(() => {
        // console.log('in get spots use effect')
        dispatch(getSpots())
        // console.log('in get spots use effect2')
    }, [dispatch])
    let spots = Object.values(spotsInfo)
    if (!spots.length) { return null }
    // console.log('***********************', spots, spotsInfo);
    return (
        <div className="border-holder">
            <ul className='spots-board'>
                {spots !== null ? spots.map(spot => (
                    <SingleSpot spot={spot} key={spot.id} />
                )) : null
                }
            </ul>
        </div>
    )
}
export default AllSpots
