import { MusicDetail } from "./musics.models";

export interface PerformerDetail {
    id: number,
    url: string,
    name: string,
    genre: string,
    origin: string,
    birth_date: Date|null,
    formation_year: number|null,
    performer_musics: MusicDetail[]
}

export interface PerformerList{

    count: number;
    next: string | null;
    previous: string | null;
    results: PerformerDetail[];
}