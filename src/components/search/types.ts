export type TitleEntry = {
    id: string;
    title: string;
}

export type FinalEntry = {
    id: string;
    title: string;
    description: string;
}

export type AutocompleteResultsProps = {
    onAutocompleteEntrySelected: () => void;
    preselectedIndex: number;
    setPreselectedIndex: (index: number) => void;
    autocompleteResults: TitleEntry[];
}