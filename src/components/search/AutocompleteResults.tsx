import React from 'react';
import { TitleEntry } from './types';

type AutocompleteResultsProps = {
    isLoadingAutocomplete: boolean;
    onAutocompleteEntrySelected: () => void;
    preselectedIndex: number;
    setPreselectedIndex: (index: number) => void;
    autocompleteResults: TitleEntry[];
}

export const AutocompleteResults = (autocompleteResultsProps: AutocompleteResultsProps) => {
    const { isLoadingAutocomplete, preselectedIndex, setPreselectedIndex, onAutocompleteEntrySelected, autocompleteResults } = autocompleteResultsProps;

    const onEnter = (index: number) => {
        setPreselectedIndex(index)
    }

    return (
        <div className='autocomplete-results-box'>
            {isLoadingAutocomplete ? <p>loading results...</p> :
                autocompleteResults.map((entry, index) =>
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