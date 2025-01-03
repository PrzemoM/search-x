export type TitleEntry = {
    id: string;
    title: string;
}

export type FinalEntry = TitleEntry & {
    description: string;
}

export type SearchMetadata = {
    searchTime: number;
    resultsCount: number;
}