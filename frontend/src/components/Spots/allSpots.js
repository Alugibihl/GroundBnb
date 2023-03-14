import { useSelector, useDispatch } from 'react-redux'
import { getSpots } from '../../store/spotsReducer'
import { useEffect } from 'react'
import SingleSpot from './spot'
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
