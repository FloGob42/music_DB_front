import { MusicDetail } from "./musics.models";

export interface PerformerDetail {

    url: string,
    name: string,
    genre: string,
    origin: string,
    birth_date: Date,
    formation_year: number
    performer_musics: MusicDetail[]
}

export interface PerformerList{

    count: number;
    next: string | null;
    previous: string | null;
    results: PerformerDetail[];
}