import React from 'react';

export const Metadata = ({ time, count }: { time: number, count: number }) =>
    <div className='search-metadata'>
        <p>Found <b>{count}</b> results in <b>{(time / 1000).toFixed(4)}</b> s</p>
    </div>