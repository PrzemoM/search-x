import React from 'react';
import { FinalEntry } from "./types";

type FinalResultsProps = {
    finalResults: FinalEntry[];
    isLoadingFinalResults: boolean;
}

export const FinalResults = (finalResultsProps: FinalResultsProps) => {
    const { finalResults, isLoadingFinalResults } = finalResultsProps;

    return (
        <div>
            {isLoadingFinalResults ? <p>loading search results...</p> :
                finalResults.map(result =>
                    <div className='result-entry' key={result.id}>
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