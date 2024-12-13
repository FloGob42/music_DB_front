import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { MusicDetail, MusicList } from '../models/musics.models';
import { HttpClient } from '@angular/common/http';
import { PerformerDetail, PerformerList } from '../models/performers.models';



@Injectable({
  providedIn: 'root'
})
export class MusicsService {

  private readonly baseUrl = 'http://127.0.0.1:8000';

  constructor(private _http: HttpClient) { }

  musics: any[] = []

  getMusics(offset: number = 0, limit: number = 21): Observable<MusicList> {
    return this._http.get<MusicList>(
      `${this.baseUrl}/musics?offset=${offset}&limit=${limit}`
    );
  }



  getMusicDetail(id: string | number): Observable<MusicDetail> {
    return this._http.get<MusicDetail>(`${this.baseUrl}/musics/${id}/`);
  }

  // addMusic(music: {title: string, genre: string, year: string, performer_id: number}){
  //   this.musics.push(music)
  //   return 
  // }


  searchMusic(titleCriteria?: string, genreCriteria?: string, offset: number = 0, limit: number = 21): Observable<MusicList> {

    return this._http.get<MusicList>(`${this.baseUrl}/musics/?genre__icontains=${genreCriteria}&title__icontains=${titleCriteria}&offset=${offset}&limit=${limit}`)

  }

  deleteMusic(id: string | number): Observable<MusicDetail> {
    return this._http.delete<MusicDetail>(`${this.baseUrl}/musics/${id}/`)
  }

  // updateMusic(id :string|number): Observable<MusicDetail> {
  //   const music = this.getMusicDetail(id)
  //   const formData = new FormData();
  //   formData.append('title', music.title);
  //   formData.append('performer', music.performer_id.toString());
  //   formData.append('genre', music.genre);
  //   formData.append('year', music.year.toString());


  //   return this._http.put<MusicDetail>(`${this.baseUrl}/musics/${music.id}/`, formData);
  // }

  updateMusic(music: MusicDetail): Observable<MusicDetail> {

    const formData = new FormData();
    formData.append('title', music.title);
    formData.append('year', music.year.toString());
    formData.append('genre', music.genre);
    formData.append('performer_id', music.performer_id.toString());

    return this._http.put<MusicDetail>(`${this.baseUrl}/musics/${music.id}/`, formData);
  }

  addMusic(music: MusicDetail): Observable<MusicDetail> {

    const formData = new FormData();
    formData.append('title', music.title);
    formData.append('year', music.year.toString());
    formData.append('genre', music.genre);
    formData.append('performer_id', music.performer_id.toString());

    return this._http.post<MusicDetail>(`${this.baseUrl}/musics/`, formData);
  }

  getPerformers(offset: number = 0, limit: number = 21): Observable<PerformerList> {
    return this._http.get<PerformerList>(
      `${this.baseUrl}/performers?offset=${offset}&limit=${limit}`
    )
  }

  getPerformerDetail(id: string | number): Observable<PerformerDetail> {
    return this._http.get<PerformerDetail>(`${this.baseUrl}/performers/${id}`)
  }



  searchPerformer(nameCriteria?: string, genreCriteria?: string, offset: number = 0, limit: number = 21) {
    return this._http.get<PerformerList>(
      `${this.baseUrl}/performers?name__icontains=${nameCriteria}&genre__icontains=${genreCriteria}&offset=${offset}&limit=${limit}`
    )

  }

  deletePerformer(id: string | number): Observable<PerformerDetail> {
    return this._http.delete<PerformerDetail>(`${this.baseUrl}/performers/${id}/`)
  }



}

