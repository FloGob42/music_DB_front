import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicSearchComponent } from '../music-search/music-search.component';
import { MusicDetailsComponent } from '../music-details/music-details.component';
import { MusicsService } from '../../services/musics.service';
import { MusicDetail } from '../../models/musics.models';
import { PerformerDetail } from '../../models/performers.models';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-musics-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MusicSearchComponent],
  templateUrl: './musics-list.component.html',
  styleUrl: './musics-list.component.scss'
})
export class MusicsListComponent {
  constructor(private _musicService: MusicsService, public readonly router: Router){}

  musics : MusicDetail[] = [];
  selectedMusic: MusicDetail | null = null;
  musicPerformer: PerformerDetail | null = null;
  
  currentPage =0;
  pageSize = 20;
  hasNextPage = true;

  ngOnInit(): void {
    this.loadMusics();
  }

  loadMusics(): void {
    console.log('passe par loadmusics')
    this._musicService.getMusics(this.currentPage * this.pageSize, this.pageSize).subscribe(data => {
      this.musics = data.results;
      this.hasNextPage = !!data.next;
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
      this.loadMusics();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadMusics();
    }
  }

  onSearch(searchTerm: string): void {
    if (searchTerm) {
      this._musicService.searchMusic(searchTerm).subscribe(
        data => this.musics = data.results
      );
    } else {
      this.loadMusics();
    }
  }
}
