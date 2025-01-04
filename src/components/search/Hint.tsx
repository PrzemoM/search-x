import cn from 'classnames';
import React, { useContext } from 'react';
import { HistoryIcon } from '../icons/HistoryIcon';
import { SearchIcon } from '../icons/SearchIcon';
import { HintContext } from './Search';

type HintProps = {
    handleMouseEnter: () => void;
    hint: string;
    isInHistory: boolean;
    isSelected: boolean;
}

export const Hint = ({
    handleMouseEnter,
    hint,
    isInHistory,
    isSelected,
}: HintProps) => {
    const hintContext = useContext(HintContext);

    return (
        <div
            className={cn('title-result-entry', {
                'title-result-entry-selected': isSelected
            })}
            onMouseEnter={handleMouseEnter}
        >
            {isInHistory ? <HistoryIcon /> : <SearchIcon />}
            <p
                className={cn('entry-text', {
                    'history-entry-text': isInHistory
                })}
                onMouseDown={hintContext.performSearchForResults}
            >
                {hint}
            </p>
            {isInHistory && isSelected &&
                <p
                    className='remove-history-entry'
                    onMouseDown={(e: React.MouseEvent<HTMLParagraphElement>) => {
                        e.preventDefault();
                        hintContext.removeFromHistory(hint);
                    }}>
                    Remove
                </p>
            }
        </div>
    )
}