import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSpots } from "../../store/spotsReducer";
import UsersSpots from "./UsersSpots";

const ManageSpots = () => {
    const userSpots = useSelector((state) => state.spots)
    const dispatch = useDispatch()
    console.log("in manage spot", userSpots)
    useEffect(() => {
        dispatch(getUserSpots())
    }, [dispatch])
    console.log("fish", userSpots);
    let spots = Object.values(userSpots)
    if (!spots.length) { return null }
    return (
        <div>
            <ul className='spots-board'>
                {spots !== null ? spots.map(spot => (
                    <UsersSpots spot={spot} key={spot.id} />
                )) : null
                }
            </ul>
        </div>
    )
}

export default ManageSpots;
