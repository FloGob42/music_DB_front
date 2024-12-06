import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicSearchComponent } from '../music-search/music-search.component';
import { MusicDetailsComponent } from '../music-details/music-details.component';
import { MusicsService } from '../../services/musics.service';
import { MusicDetail } from '../../models/musics.models';
import { PerformerDetail } from '../../models/performers.models';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-musics-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MusicSearchComponent, FormsModule],
  templateUrl: './musics-list.component.html',
  styleUrl: './musics-list.component.scss'
})
export class MusicsListComponent {
  constructor(private _musicService: MusicsService, public readonly router: Router) { }

  musics: MusicDetail[] = [];
  selectedMusic: MusicDetail | null = null;
  musicPerformer: PerformerDetail | null = null;
  searchTermTitle?: string = '';
  searchTermGenre?: string = ''
  currentPage = 0;
  pageSize = 20;
  hasNextPage = true;

  ngOnInit(): void {
    this.loadMusics();
  }

  loadMusics(): void {
    console.log('passe par loadmusics')
    this._musicService.getMusics().subscribe(data => {
      this.musics = data.results;
      this.hasNextPage = !!data.next;
      console.log(data.results)
    });
  }

  loadMusicDetail(music: MusicDetail): void {
    const id = music.url.split('/').slice(-2, -1)[0];
    this._musicService.getMusicDetail(id).subscribe(
      detail => this.selectedMusic = detail
    )
  }

  loadPerformerDetail(performer: PerformerDetail): void {
    const id = performer.url.split('/').slice(-2, -1)[0];
    this._musicService.getPerformerDetail(id).subscribe(
      detail => this.musicPerformer = detail
    )
  }

  nextPage(): void {
    if (this.hasNextPage) {
      this.currentPage++;
      this._musicService.searchMusic(this.searchTermTitle, this.searchTermGenre, this.currentPage * this.pageSize, this.pageSize).subscribe(data => {
        this.musics = data.results;
        this.hasNextPage = !!data.next;;})
    }
  }

  previousPage(): void {

    if (this.currentPage > 0) {
      this.currentPage--;
      this._musicService.searchMusic(this.searchTermTitle, this.searchTermGenre, this.currentPage * this.pageSize, this.pageSize).subscribe(data => {
        this.musics = data.results;
        this.hasNextPage = !!data.next;;});
    }
  }

  onSearch(searchTerm?: string, searchTermGenre?: string ): void {
    console.log(searchTerm)
    this.searchTermTitle = searchTerm
    this.searchTermGenre = searchTermGenre
    this._musicService.searchMusic(searchTerm, searchTermGenre).subscribe(
      data => {
        this.musics = data.results;
        this.hasNextPage = !!data.next
      });


  }



  onSearchGenre(searchTermGenre: string): void {
    if (searchTermGenre) {
      this._musicService.searchMusicGenre(searchTermGenre).subscribe(
        data => {
          this.musics = data.results;
          this.hasNextPage = !!data.next
        });
    } else {
      this.loadMusics();
    }
  }
}
