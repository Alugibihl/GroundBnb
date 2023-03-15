import React from 'react';
import { NavLink } from 'react-router-dom';
import './Spots.css'

const UsersSpots = ({ spot }) => {
    return (
        <>
            <nav className='spot-card'>
                <NavLink to={`/spots/${spot.id}`}>
                    <img alt={spot.name} src={spot.previewImage}></img>
                    <div className='aligned'><div className='card-location'>{spot.city}, {spot.state}</div><div className='average-rating'>
                        <i className="fa-solid fa-star"></i>{spot.avgRating}</div><div>
                        </div>  </div> <div className='price'>${spot.price}.00 night</div>
                </NavLink>
                <div ><button >Update</button><button>Delete</button></div>
            </nav>
        </>
    );
};

export default UsersSpots;
