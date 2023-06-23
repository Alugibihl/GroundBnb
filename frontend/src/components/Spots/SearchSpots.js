import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search } from './spots'; // Import the search action

const SearchComponent = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const searchResults = useSelector((state) => state.spots.searchResults);

    const handleSearch = () => {
        dispatch(search(query));
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {searchResults.length > 0 ? (
                <ul>
                    {searchResults.map((spot) => (
                        <li key={spot.id}>{spot.title}</li>
                    ))}
                </ul>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};
export default SearchComponent
