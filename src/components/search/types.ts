export type SearchHint = {
    id: string;
    title: string;
}

export type SearchResult = SearchHint & {
    description: string;
}

export type SearchMetadata = {
    resultsCount: number;
    searchTime: number;
}