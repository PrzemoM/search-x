import React from 'react';
import { TitleEntry } from './types';
import { SearchIcon } from './SearchIcon';
import { HistoryIcon } from './HistoryIcon';
import cn from 'classnames';

type AutocompleteResultsProps = {
    isLoadingAutocomplete: boolean;
    onAutocompleteEntrySelected: () => void;
    preselectedIndex: number;
    setPreselectedIndex: (index: number) => void;
    autocompleteResults: TitleEntry[];
    recentSearchHistory: string[];
    removeFromRecentSearchHistory: (itemToRemove: string) => void;
}

export const AutocompleteResults = (autocompleteResultsProps: AutocompleteResultsProps) => {
    const { isLoadingAutocomplete, preselectedIndex, setPreselectedIndex, onAutocompleteEntrySelected, autocompleteResults, recentSearchHistory, removeFromRecentSearchHistory } = autocompleteResultsProps;

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
                    >
                        {recentSearchHistory.includes(entry.title) ? <HistoryIcon /> : <SearchIcon />}
                        <p className={cn('entry-text', { 'history-entry-text': recentSearchHistory.includes(entry.title) })} onMouseDown={onAutocompleteEntrySelected}>{entry.title}</p>
                        {recentSearchHistory.includes(entry.title) && index === preselectedIndex &&
                            <p
                                className='remove-history-entry'
                                onMouseDown={(e: React.MouseEvent<HTMLParagraphElement>) => {
                                    e.preventDefault();
                                    removeFromRecentSearchHistory(entry.title);
                                }}>Remove</p>
                        }
                    </div>
                )}
        </div>
    )
}