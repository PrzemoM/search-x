import React from 'react';
import { SearchResult } from "./types";

type SearchResultsProps = {
    searchResults: SearchResult[];
    isLoadingResults: boolean;
}

export const SearchResults = (searchResultsProps: SearchResultsProps) => {
    const { searchResults, isLoadingResults } = searchResultsProps;

    return (
        <div>
            {isLoadingResults
                ? <p>loading search results...</p>
                : searchResults.map(result =>
                    <div
                        key={result.id}
                        className='result-entry'
                    >
                        <a href={`https://www.google.pl/search?q=${result.title}`}>
                            <h3 className='result-title'>{result.title}</h3>
                        </a>
                        <p className='result-description'>{result.description}</p>
                    </div >
                )
            }
        </div>
    )
}