import { useSelector, useDispatch } from 'react-redux'
import { getSpots } from '../../store/spotsReducer'
import { useEffect } from 'react'
import SingleSpot from './Spot'
import SearchComponent from './SearchSpots'
import './Spots.css'

const AllSpots = () => {
    const spotsInfo = useSelector((state) => state.spots)
    const dispatch = useDispatch()
    let spotholder = Object.values(spotsInfo)
    let spots = []
    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    if (!spotsInfo) { return null }
    for (let spot of spotholder) {
        if (spots.length < 20) {
            spots.push(spot)
        }
    }

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
