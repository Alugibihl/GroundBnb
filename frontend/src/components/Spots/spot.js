import React from 'react';
import { Link } from 'react-router-dom';
import SpotDetails from './SpotDetails';
import './Spots.css'

const SingleSpot = ({ spot }) => {
    // const dispatch = useDispatch()


    // needs a link to the page that corresponds to the


    return (
        <>
            <nav className='spot-card'>
                <Link to={`/spots/${spot.id}`}>
                    <img alt={spot.name} src={spot.previewImage}></img>
                    <div className='aligned'><div>{spot.city}, {spot.state}</div><div className='average-rating'><i className="fa-solid fa-star"></i>{spot.avgRating}</div><div>
                    </div>  </div> <div className='price'>${spot.price}.00 night</div>
                </Link>
            </nav>
        </>
    );
};

export default SingleSpot;
