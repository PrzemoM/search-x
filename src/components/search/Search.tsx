import React, { useCallback, useState } from 'react';

export const Search = () => {
    const [inputValue, setInputValue] = useState("")

    const inputRef = useCallback((inputElement: HTMLInputElement) => {
        if (inputElement) {
            inputElement.focus();
        }
    }, []);

    return (
        <div>
            <p>Search-x</p>
            <input ref={inputRef} value={inputValue} onChange={e => setInputValue(e.target.value)} />
        </div>
    )
}