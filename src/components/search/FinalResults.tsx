import React from 'react';
import { FinalEntry } from "./types"

type FinalResultsProps = {
    finalResults: FinalEntry[]
}

export const FinalResults = (finalResultsProps: FinalResultsProps) => {
    const { finalResults } = finalResultsProps;

    return (
        <>
            {
                finalResults.map(result =>
                    <div className='result-container'>
                        <a href={`https://www.google.pl/search?q=${result.title}`}>
                            <h3 className='result-title'>{result.title}</h3>
                        </a>
                        <p className='result-description'>{result.description}</p>
                    </div >
                )
            }
        </>
    )
}