import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSpots } from "../../store/spotsReducer";
import { useHistory } from 'react-router-dom'
import UsersSpots from "./UsersSpots";
import './Spots.css'

const ManageSpots = () => {
    const user = useSelector((state) => state)
    const userSpots = useSelector((state) => state.spots)
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        dispatch(getUserSpots())
    }, [dispatch])

    let spots = Object.values(userSpots)

    const newSpot = () => {
        let path = "'/spots/new'"
        history.push(path)
    }

    return (
        <div className='all-base'>
            <h4 className="title-page-position">Manage Spots</h4>
            <ul className='spots-board'>
                {spots?.length > 0 ? spots.map(spot => (
                    < UsersSpots key={spot.id} spot={spot} />
                )) : <button onClick={newSpot} className="title-page-position">Create a new Spot</button>
                }
            </ul>
        </div>
    )
}

export default ManageSpots;
