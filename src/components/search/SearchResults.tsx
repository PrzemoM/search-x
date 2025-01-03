import React, { useCallback, useEffect, useState } from 'react';
import { SearchResultsProps } from './types';

export const SearchResults = (searchResultsProps: SearchResultsProps) => {
    const { results: searchResults } = searchResultsProps;

    return (
        <div className='results-box'>
            {searchResults.map(result =>
                <p>{result.title}</p>
            )}
        </div>
    )
}