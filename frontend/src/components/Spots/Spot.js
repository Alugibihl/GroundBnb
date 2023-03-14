import React from 'react';
import { NavLink } from 'react-router-dom';
import './Spots.css'

const SingleSpot = ({ spot }) => {
    return (
        <>
            <nav className='spot-card'>
                <NavLink to={`/spots/${spot.id}`}>
                    <img alt={spot.name} src={spot.previewImage}></img>
                    <div className='aligned'><div>{spot.city}, {spot.state}</div><div className='average-rating'><i className="fa-solid fa-star"></i>{spot.avgRating}</div><div>
                    </div>  </div> <div className='price'>${spot.price}.00 night</div>
                </NavLink>
            </nav>
        </>
    );
};

export default SingleSpot;
