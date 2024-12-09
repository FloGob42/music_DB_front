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


  getMusics(offset: number = 0, limit: number = 20): Observable<MusicList> {
    return this._http.get<MusicList>(
      `${this.baseUrl}/musics?offset=${offset}&limit=${limit}`
    );
  }


  getMusicDetail(id: string | number): Observable<MusicDetail> {
    return this._http.get<MusicDetail>(`${this.baseUrl}/musics/${id}/`);
  }




  searchMusic(titleCriteria?: string, genreCriteria?: string, offset: number = 0, limit: number = 20): Observable<MusicList> {

    return this._http.get<MusicList>(`${this.baseUrl}/musics/?genre__icontains=${genreCriteria}&title__icontains=${titleCriteria}&offset=${offset}&limit=${limit}`)

  }


  getPerformers(offset: number = 0, limit: number = 20): Observable<PerformerList> {
    return this._http.get<PerformerList>(
      `${this.baseUrl}/performers?offset=${offset}&limit=${limit}`
    )
  }

  getPerformerDetail(id: string | number): Observable<PerformerDetail> {
    return this._http.get<PerformerDetail>(`${this.baseUrl}/performers/${id}`)
  }



  searchPerformer(nameCriteria?: string, genreCriteria?: string, offset: number = 0, limit: number = 20){
    return this._http.get<PerformerList>(
      `${this.baseUrl}/performers?name__icontains=${nameCriteria}&genre__icontains=${genreCriteria}&offset=${offset}&limit=${limit}`
    )

  }


}

