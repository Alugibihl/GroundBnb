import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSpots } from "../../store/spotsReducer";
import { NavLink } from 'react-router-dom'
import UsersSpots from "./UsersSpots";
import './Spots.css'

const ManageSpots = () => {
    const userSpots = useSelector((state) => state.spots)
    const dispatch = useDispatch()
    console.log("in manage spot", userSpots)
    useEffect(() => {
        dispatch(getUserSpots())
    }, [dispatch])
    let spots = Object.values(userSpots)
    return (
        <div>
            <h4 className="title-page-position">Manage Spots</h4>
            <ul className='spots-board'>
                {spots?.length > 0 ? spots.map(spot => (
                    <UsersSpots key={spot.id} spot={spot} />
                )) : <button className="title-page-position"><NavLink className="new-spot-link" to={'/spots/new'}>Create a new Spot</NavLink></button>
                }
            </ul>
        </div>
    )
}

export default ManageSpots;
