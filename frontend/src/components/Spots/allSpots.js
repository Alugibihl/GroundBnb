import { useSelector, useDispatch } from 'react-redux'
import { getSpots } from '../../store/spotsReducer'
import { useEffect } from 'react'
import './Spots.css'

const AllSpots = () => {
    const spotsInfo = useSelector((state) => state.spots)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])
    let spots = Object.values(spotsInfo)
    console.log(spots);
    return (
        <div>
            <h2 className='spotted'>Spots</h2>
            <ul>
                {/* {
                    spots.map(spot => (
                        <singleSpot spot={spot} key={spot.id} />
                    ))
                } */}
            </ul>
        </div>
    )
}
export default AllSpots
