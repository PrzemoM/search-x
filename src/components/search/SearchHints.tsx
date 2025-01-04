import React from 'react';
import { Hint } from './Hint';
import { SearchHint } from './types';

type SearchHintsProps = {
    hints: SearchHint[];
    isLoadingHints: boolean;
    preselectedIndex: number;
    history: string[];
    setPreselectedIndex: (index: number) => void;
}

export const SearchHints = (searchHintsProps: SearchHintsProps) => {
    const {
        hints,
        isLoadingHints,
        preselectedIndex,
        history,
        setPreselectedIndex
    } = searchHintsProps;

    return (
        <div className='autocomplete-results-box'>
            {isLoadingHints
                ? <p>loading results...</p>
                : hints.map((entry, index) =>
                    <Hint
                        key={entry.id}
                        handleMouseEnter={() => setPreselectedIndex(index)}
                        hint={entry.title}
                        isInHistory={history.includes(entry.title)}
                        isSelected={index === preselectedIndex}
                    />
                )}
        </div>
    )
}