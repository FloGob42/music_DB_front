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
    
  
  getMusics(offset: number =0, limit:number=20): Observable<MusicList> {
      return this._http.get<MusicList>(
        `${this.baseUrl}/musics?offset=${offset}&limit=${limit}`
      );
    }
  
  
  getMusicDetail(id: string | number): Observable<MusicDetail> {
    return this._http.get<MusicDetail>(`${this.baseUrl}/musics/${id}/`);
    }


  // searchMusic(criteria: string): Observable<MusicList> {
  //   return this.getMusics(0, 1000).pipe(
  //     map(list => ({
  //       ...list,
  //       results: list.results.filter(music =>
  //         music.title.toLowerCase().includes(criteria.toLowerCase()) || music.genre.toLowerCase().includes(criteria.toLowerCase())
  //       )
        
  //     }))
  //   );
  // }

  // searchMusic(criteria: string): Observable<MusicList> {
  //   return this.getMusics(0, 200).pipe(
  //     tap(list => {
  //       // This will log the 'list' object before filtering
  //       console.log('List before filtering:', list);
  //     }),
  //     map(list => ({
  //       ...list,
  //       results: list.results.filter(music =>
  //         music.title.toLowerCase().includes(criteria.toLowerCase()) || 
  //         music.genre.toLowerCase().includes(criteria.toLowerCase())
  //       )
  //     }))
  //   );
  // }

  searchMusic(titleCriteria?: string, genreCriteria?: string, offset:number=0, limit: number=20): Observable<MusicList>{
    
    return this._http.get<MusicList>(`${this.baseUrl}/musics/?genre__icontains=${genreCriteria}&title__icontains=${titleCriteria}&offset=${offset}&limit=${limit}`)
  
}



  searchMusicGenre(criteria: string, offset:number=0, limit: number=20): Observable<MusicList>{
    return this._http.get<MusicList>(`${this.baseUrl}/musics/?genre__icontains=${criteria}&offset=${offset}&limit=${limit}`)
  }

  getPerformers(offset: number = 0, limit: number = 20): Observable<PerformerList> {
    return this._http.get<PerformerList>(
      `${this.baseUrl}/performers?offset=${offset}&limit=${limit}`
    )
  }

  getPerformerDetail(id: string | number): Observable<PerformerDetail>{
    return this._http.get<PerformerDetail>(`${this.baseUrl}/performers/${id}`)
  }

  // getPerformerMusics(name: string): Observable<MusicList> {
  //   return this.getMusics(0, 1000).pipe(
  //     map(list => ({
  //       ...list,
  //       results: list.results.filter(music =>
  //         music.performer_name.toLowerCase().includes(name.toLowerCase())
  //       )
  //     }))
  //   )
  // }

  searchPerformer(name: string): Observable<PerformerList> {
    return this.getPerformers(0, 1000).pipe(
      map(list => ({
        ...list,
        results: list.results.filter(performer =>
          performer.name.toLowerCase().includes(name.toLowerCase())
        )
      }))
    )
  }

  searchPerformerGenre(genre: string): Observable<PerformerList> {
    return this.getPerformers(0, 1000).pipe(
      map(list => ({
        ...list,
        results: list.results.filter(performer =>
          performer.genre.toLowerCase().includes(genre.toLowerCase())
        )
      }))
    )
  }
  
  // searchMusicGenre(genre: string): Observable<MusicList> {
  //   return this.getMusics(0, 1000).pipe(
  //     map(list => ({
  //       ...list,
  //       results: list.results.filter(music =>
  //         music.genre.toLowerCase().includes(genre.toLowerCase())
  //       )
  //     }))
  //   );
  // }

}

