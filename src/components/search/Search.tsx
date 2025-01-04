import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { fakeData } from '../../data/data';
import { Metadata } from './Metadata';
import { SearchHints } from './SearchHints';
import { SearchResults } from './SearchResults';
import { SearchHint, SearchMetadata, SearchResult } from './types';

type HintContextType = {
    performSearchForResults: () => void;
    removeFromHistory: (hint: string) => void;
}

export const HintContext = createContext<HintContextType>({ performSearchForResults: () => { }, removeFromHistory: () => { } });

export const Search = () => {
    const [inputValue, setInputValue] = useState("")
    const [isInputFocused, setIsInputFocused] = useState(false)
    const [preselectedIndex, setPreselectedIndex] = useState(-1)

    const [isLoadingHints, setIsLoadingHints] = useState(false)
    const [isLoadingResults, setIsLoadingResults] = useState(false)

    const [hints, setHints] = useState<SearchHint[]>([])
    const [results, setResults] = useState<SearchResult[]>([])
    const [history, setHistory] = useState<string[]>([])
    const [metadata, setMetadata] = useState<SearchMetadata | null>(null)

    const inputRef = useCallback((inputElement: HTMLInputElement) => {
        if (inputElement) {
            inputElement.focus();
        }
    }, []);

    useEffect(() => {
        if (inputValue) {
            setIsLoadingHints(true)

            // random timeout to simulate network response delay
            setTimeout(() => {
                const results = fakeData.filter(entry => entry.title.toLowerCase().startsWith(inputValue.toLowerCase()));
                setHints(results.slice(0, 10).map(result => ({ id: result.id, title: result.title })))
                setIsLoadingHints(false)
            }, Math.random() * 1000);
        }
    }, [inputValue])

    const handleSearchInputChange = (value: string) => {
        setPreselectedIndex(-1);
        setInputValue(value);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!inputValue) {
            return;
        }

        const key = e.key;
        if (key == "ArrowUp" && preselectedIndex > 0) {
            setPreselectedIndex(prevState => prevState - 1);
        }
        if (key == "ArrowDown" && preselectedIndex < hints.length - 1) {
            setPreselectedIndex(prevState => prevState + 1);
        }
        if (key === "Enter" && preselectedIndex !== -1) {
            performSearchForResults();
        }
    }

    const performSearchForResults = () => {
        setIsLoadingResults(true);

        const selectedHint = hints[preselectedIndex];
        setInputValue(selectedHint.title);
        setHistory(prevState => [...new Set(prevState).add(selectedHint.title)]);

        // again random timeout to simulate network response delay
        const delay = Math.random() * 2000;
        setTimeout(() => {
            // slicing found results to randomize the number of found results (just a 'hack', it's easier this way than generating fake randomized entries for each search title)
            const results = fakeData.find(data => data.id === selectedHint.id)?.entries.slice(0, Math.random() * 50);
            if (results) {
                const shuffledResults = results.sort((a, b) => 0.5 - Math.random());
                setResults(shuffledResults)
            }
            setIsLoadingResults(false);
            setMetadata({ searchTime: delay, resultsCount: results?.length || 0 })
        }, delay);

    }

    const showHints = isInputFocused && inputValue && !!hints.length;
    const showMetadata = !isLoadingResults && metadata;

    return (
        <div onKeyDown={handleKeyDown}>
            <p className='search-logo'>SEARCH-X</p>
            <div className='search-container'>
                <input
                    ref={inputRef}
                    className='search-input'
                    onBlur={() => setIsInputFocused(false)}
                    onFocus={() => setIsInputFocused(true)}
                    value={inputValue}
                    onChange={e => handleSearchInputChange(e.target.value)}
                    placeholder='Enter your search here'
                />
                {showHints &&
                    <HintContext.Provider value={{
                        performSearchForResults,
                        removeFromHistory: (itemToRemove: string) => setHistory(prevState => prevState.filter(item => item !== itemToRemove))
                    }}>
                        <SearchHints
                            isLoadingHints={isLoadingHints}
                            preselectedIndex={preselectedIndex}
                            setPreselectedIndex={setPreselectedIndex}
                            hints={hints}
                            history={history}
                        />
                    </HintContext.Provider>
                }
            </div>
            {showMetadata && <Metadata {...metadata} />}
            <SearchResults searchResults={results} isLoadingResults={isLoadingResults} />
        </div>
    )
}