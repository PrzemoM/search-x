import React, { useState } from 'react';
import { AutocompleteResultsProps } from './types';

export const AutocompleteResults = (searchResultsProps: AutocompleteResultsProps) => {
    const { preselectedIndex, setPreselectedIndex, onAutocompleteEntrySelected, autocompleteResults } = searchResultsProps;

    const onEnter = (index: number) => {
        setPreselectedIndex(index)
    }

    return (
        <div className='autocomplete-results-box'>
            {autocompleteResults.map((entry, index) =>
                <div
                    key={entry.id}
                    className={`title-result-entry${index === preselectedIndex ? " title-result-entry-selected" : ""}`}
                    onMouseEnter={() => onEnter(index)}
                    onMouseDown={onAutocompleteEntrySelected}>
                    <p>{entry.title}</p>
                </div>
            )}
        </div>
    )
}