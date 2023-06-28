import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots, performSearch, spotCleanUp } from '../../store/spotsReducer';
import SearchResults from './SearchResults';


const SearchComponent = ({ spots }) => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const searchResults = useSelector((state) => state.spots.searchResults);
    const [visible, setVisible] = useState(false)

    useEffect(() => {
    }, [dispatch, query])

    const handleSearch = async () => {
        setVisible(true)
        await dispatch(performSearch(query));
    };
    const handleClear = async () => {
        setVisible(false)
        setQuery("")
        await dispatch(spotCleanUp())
        await dispatch(getSpots())
    }

    return (
        <div className='holder'>
            <div className='big-searcher'>
                <div className='search-bar'>
                    <div className='search-field'>
                        <input
                            type="search"
                            value={query}
                            placeholder="Search for your next rental..."
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <div className='magnifier'>
                            <button className='search-but' onClick={handleSearch}><i className={`fas fa-search dynamic-icon`}></i></button>
                        </div>
                    </div>
                    <div className='search-buttons'>
                        <button className='search-button' onClick={handleSearch}>Search for a Rental</button>
                        <button className='search-button' onClick={handleClear}>Clear Search Results</button>
                    </div>
                </div>
                {searchResults?.length > 0 ? (
                    <ul className={visible ? 'result-tree' : "hidden"}>
                        {searchResults?.map((spot) => <SearchResults key={spot.id} spot={spot} />)}
                    </ul>
                ) : (
                    <p className={visible ? "" : "hidden"}>No results found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchComponent
