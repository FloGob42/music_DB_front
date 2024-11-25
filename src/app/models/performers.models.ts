export interface PerformerDetail {

    url: string,
    name: string,
    genre: string,
    origin: string,
    birth_date: Date,
    formation_year: number
}

export interface PerformerList{

    count: number;
    next: string | null;
    previous: string | null;
    results: PerformerDetail[];
}