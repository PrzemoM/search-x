import React, { useCallback, useEffect, useState } from 'react';
import { fakeData } from '../../data/data';
import { AutocompleteResults } from './AutocompleteResults';
import { FinalEntry, SearchMetadata, TitleEntry } from './types';
import { FinalResults } from './FinalResults';
import { Metadata } from './Metadata';

export const Search = () => {
    const [inputValue, setInputValue] = useState("")
    const [canShowResultsBox, setCanShowResultsBox] = useState(false)
    const [preselectedIndex, setPreselectedIndex] = useState(-1)

    const [isLoadingAutocomplete, setIsLoadingAutocomplete] = useState(false)
    const [isLoadingFinalResults, setIsLoadingFinalResults] = useState(false)

    const [titleSearchResults, setTitleSearchResults] = useState<TitleEntry[]>([])
    const [finalResults, setFinalResults] = useState<FinalEntry[]>([])
    const [metadata, setMetadata] = useState<SearchMetadata | null>(null)

    const inputRef = useCallback((inputElement: HTMLInputElement) => {
        if (inputElement) {
            inputElement.focus();
        }
    }, []);

    useEffect(() => {
        if (inputValue) {
            setIsLoadingAutocomplete(true)

            // random timeout to simulate network response delay
            setTimeout(() => {
                const currentSearchResults = fakeData.filter(entry => entry.title.toLowerCase().startsWith(inputValue.toLowerCase()));
                setTitleSearchResults(currentSearchResults.slice(0, 10).map(result => ({ id: result.id, title: result.title })))
                setIsLoadingAutocomplete(false)
            }, Math.random() * 1000);
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
        setIsLoadingFinalResults(true);

        const chosenSearchTitle = titleSearchResults[preselectedIndex];
        setInputValue(chosenSearchTitle.title);

        // again random timeout to simulate network response delay
        const delay = Math.random() * 2000;
        setTimeout(() => {
            // slicing found results to randomize the number of found results (just a 'hack', it's easier this way than generating fake randomized entries for each search title)
            const finalSearchEntries = fakeData.find(data => data.id === chosenSearchTitle.id)?.entries.slice(0, Math.random() * 50);
            if (finalSearchEntries) {
                const shuffledEntries = finalSearchEntries?.sort((a, b) => 0.5 - Math.random());
                setFinalResults(shuffledEntries)
            }
            setIsLoadingFinalResults(false);
            setMetadata({ searchTime: delay, resultsCount: finalSearchEntries?.length || 0 })
        }, delay);

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
                {canShowResultsBox && inputValue && !!titleSearchResults.length &&
                    // {inputValue &&
                    <AutocompleteResults
                        isLoadingAutocomplete={isLoadingAutocomplete}
                        onAutocompleteEntrySelected={performSearchForFinalResults}
                        preselectedIndex={preselectedIndex}
                        setPreselectedIndex={setPreselectedIndex}
                        autocompleteResults={titleSearchResults}
                    />
                }
            </div>
            {!isLoadingFinalResults && metadata && <Metadata time={metadata?.searchTime} count={metadata?.resultsCount} />}
            <FinalResults finalResults={finalResults} isLoadingFinalResults={isLoadingFinalResults} />
        </div>
    )
}