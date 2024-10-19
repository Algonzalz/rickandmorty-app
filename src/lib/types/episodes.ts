export interface ITransactionEpisode {
    info:    Info;
    results: IEpisode[];
}

export interface Info {
    count: number;
    pages: number;
    next:  string;
    prev:  null;
}

export interface IEpisode {
    id:         number;
    name:       string;
    air_date:   string;
    episode:    string;
    characters: string[];
    url:        string;
    created:    string;
}
