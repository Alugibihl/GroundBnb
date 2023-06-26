import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'

const SearchResults = ({ spot }) => {
    return (
        <div>
            <NavLink className='each-spot' to={`/spots/${spot.id}`} key={spot.id}>{spot.name}
            </NavLink>
        </div >
    );
};
export default SearchResults
