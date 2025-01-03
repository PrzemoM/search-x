import React, { useCallback, useEffect, useState } from 'react';
import { fakeData } from '../../data/data';
import { SearchEntry } from './types';
import { SearchResults } from './SearchResults';

export const Search = () => {
    const [inputValue, setInputValue] = useState("")
    const [isResultsBoxVisible, setIsResultsBoxVisible] = useState(false)
    const [searchResults, setSearchResults] = useState<SearchEntry[]>([])

    const inputRef = useCallback((inputElement: HTMLInputElement) => {
        if (inputElement) {
            inputElement.focus();
        }
    }, []);

    useEffect(() => {
        if (inputValue) {
            const currentSearchResults = fakeData.filter(entry => entry.title.toLocaleLowerCase().startsWith(inputValue));
            setSearchResults(currentSearchResults.slice(0, 10))
        }

    }, [inputValue])

    return (
        <div className='search-container'>
            <p className='search-logo'>SEARCH-X</p>
            <input
                ref={inputRef}
                onFocus={() => setIsResultsBoxVisible(true)}
                onBlur={() => setIsResultsBoxVisible(false)}
                className='search-input' value={inputValue}
                onChange={e => setInputValue(e.target.value)} />
            {isResultsBoxVisible && inputValue &&
                <SearchResults results={searchResults} />
            }
        </div>
    )
}