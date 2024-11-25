import { PerformerDetail } from "./performers.models";

export interface MusicDetail{
    url: string,
    id: number,
    title: string,
    year: number,
    genre: string,
    performer_id: number,
    performer_name: string,
    performer: PerformerDetail
}

export interface MusicList{

    count: number;
  next: string | null;
  previous: string | null;
  results: MusicDetail[];
}