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
import { PerformerDetailsComponent } from '../../performers/performer-details/performer-details.component';

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
  numberOfPages?: number | null

  ngOnInit(): void {
    this.loadMusics();
  }

  loadMusics(): void {
    console.log('passe par loadmusics')
    this._musicService.getMusics().subscribe(data => {
      this.musics = data.results;
      this.hasNextPage = !!data.next;
      this.numberOfPages = Math.ceil(data.count/this.pageSize)
    });
  }



  nextPage(): void {
    if (this.hasNextPage) {
      this.currentPage++;
      this._musicService.searchMusic(this.searchTermTitle, this.searchTermGenre, this.currentPage * this.pageSize, this.pageSize).subscribe(data => {
        this.musics = data.results;
        this.hasNextPage = !!data.next;;
      })
    }
  }

  previousPage(): void {

    if (this.currentPage > 0) {
      this.currentPage--;
      this._musicService.searchMusic(this.searchTermTitle, this.searchTermGenre, this.currentPage * this.pageSize, this.pageSize).subscribe(data => {
        this.musics = data.results;
        this.hasNextPage = !!data.next;;
      });
    }
  }

  onSearch(searchTerm?: string, searchTermGenre?: string): void {
    this.searchTermTitle = searchTerm
    this.searchTermGenre = searchTermGenre
    this._musicService.searchMusic(searchTerm, searchTermGenre).subscribe(
      data => {
        this.musics = data.results;
        this.hasNextPage = !!data.next
        this.numberOfPages = Math.ceil(data.count/this.pageSize)
        console.log(this.numberOfPages)
      });


  }
}
