import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { performSearch } from '../../store/spotsReducer';
import SearchResults from './SearchResults';


const SearchComponent = ({ spots }) => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const searchResults = useSelector((state) => state.spots.searchResults);
    const [visible, setVisible] = useState(false)

    useEffect(() => {
    }, [dispatch, query])

    const handleSearch = () => {
        setVisible(true)
        dispatch(performSearch(query));
        console.log("query", query, searchResults);
    };

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
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>
                    <button onClick={handleSearch}>Search</button>
                </div>
                {searchResults?.length > 0 ? (
                    <ul className='result-tree'>
                        {searchResults?.map((spot) => (
                            <SearchResults spot={spot} />
                        ))}
                    </ul>
                ) : (
                    <p className={visible ? "" : "hidden"}>No results found.</p>
                )}
            </div>
        </div>
    );
};
export default SearchComponent
