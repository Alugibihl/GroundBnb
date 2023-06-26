import { useSelector, useDispatch } from 'react-redux'
import { getSpots } from '../../store/spotsReducer'
import { useEffect } from 'react'
import SingleSpot from './Spot'
import SearchComponent from './SearchSpots'
import './Spots.css'

const AllSpots = () => {
    const spotsInfo = useSelector((state) => state.spots)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])
    let spots = Object.values(spotsInfo)
    if (!spots.length) { return null }
    return (
        <div>
            <div><SearchComponent spots={spotsInfo} /></div>
            <div className="border-holder">
                <ul className='spots-board'>
                    {spots !== null ? spots.map(spot => (
                        <SingleSpot spot={spot} key={spot.id} />
                    )) : null
                    }
                </ul>
            </div>
        </div>
    )
}

export default AllSpots
