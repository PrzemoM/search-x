import React from 'react';
import { SearchMetadata } from './types';

export const Metadata = ({ resultsCount, searchTime }:SearchMetadata) =>
    <div className='search-metadata'>
        <p>Found <b>{resultsCount}</b> results in <b>{(searchTime / 1000).toFixed(4)}</b> s</p>
    </div>