import React, { useCallback, useEffect, useState } from 'react';
import { fakeData } from '../../data/data';
import { AutocompleteResults } from './AutocompleteResults';
import { FinalEntry, TitleEntry } from './types';
import { FinalResults } from './FinalResults';

export const Search = () => {
    const [inputValue, setInputValue] = useState("")
    const [canShowResultsBox, setCanShowResultsBox] = useState(false)
    const [preselectedIndex, setPreselectedIndex] = useState(-1)

    const [titleSearchResults, setTitleSearchResults] = useState<TitleEntry[]>([])
    const [finalResults, setFinalResults] = useState<FinalEntry[]>([])

    const inputRef = useCallback((inputElement: HTMLInputElement) => {
        if (inputElement) {
            inputElement.focus();
        }
    }, []);

    useEffect(() => {
        if (inputValue) {
            const currentSearchResults = fakeData.filter(entry => entry.title.toLocaleLowerCase().startsWith(inputValue));
            setTitleSearchResults(currentSearchResults.slice(0, 10).map(result => ({ id: result.id, title: result.title })))
        }

    }, [inputValue])

    const handleSearchInputChange = (newValue: string) => {
        setInputValue(newValue)
        if (!canShowResultsBox) {
            setCanShowResultsBox(true);
        }
    }

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setCanShowResultsBox(false);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!inputValue) {
            return;
        }

        const key = e.key;

        if (key == "ArrowUp" && preselectedIndex > 0) {
            setPreselectedIndex(prevState => prevState - 1);
        }

        if (key == "ArrowDown" && preselectedIndex < titleSearchResults.length - 1) {
            setPreselectedIndex(prevState => prevState + 1);
        }

        if (key === "Enter" && preselectedIndex !== -1) {
            performSearchForFinalResults();
            setCanShowResultsBox(false);
        }
    }

    const performSearchForFinalResults = () => {
        const chosenSearchTitle = titleSearchResults[preselectedIndex];
        const finalSearchEntries = fakeData.find(data => data.id === chosenSearchTitle.id)?.entries;
        if (finalSearchEntries) {
            const shuffledEntries = finalSearchEntries?.sort((a, b) => 0.5 - Math.random());
            setFinalResults(shuffledEntries)
        }
    }

    return (
        <div onKeyDown={handleKeyDown}>
            <p className='search-logo'>SEARCH-X</p>
            <div className='search-container'>
                <input
                    ref={inputRef}
                    onFocus={() => setCanShowResultsBox(true)}
                    onBlur={handleInputBlur}
                    className='search-input' value={inputValue}
                    onChange={e => handleSearchInputChange(e.target.value)}
                    placeholder='Enter your search here'
                />
                {canShowResultsBox && inputValue && titleSearchResults &&
                    // {inputValue &&
                    <AutocompleteResults
                        onAutocompleteEntrySelected={performSearchForFinalResults}
                        preselectedIndex={preselectedIndex}
                        setPreselectedIndex={setPreselectedIndex}
                        autocompleteResults={titleSearchResults}
                    />
                }
            </div>
            <FinalResults finalResults={finalResults} />
        </div>
    )
}