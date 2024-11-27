import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformerSearchComponent } from '../performer-search/performer-search.component';
import { PerformerDetailsComponent } from '../performer-details/performer-details.component';
import { MusicsService } from '../../services/musics.service';
import { MusicDetail, MusicList } from '../../models/musics.models';
import { PerformerDetail } from '../../models/performers.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-performers-list',
  standalone: true,
  imports: [CommonModule, PerformerDetailsComponent, PerformerSearchComponent],
  templateUrl: './performers-list.component.html',
  styleUrl: './performers-list.component.scss'
})
export class PerformersListComponent {
  constructor(private _musicService: MusicsService, public readonly router: Router){}

  performers : PerformerDetail[] = [];
  selectedperformer: PerformerDetail | null = null;
  performerMusics: MusicList | null =null;
  
  currentPage =0;
  pageSize = 20;
  hasNextPage = true;

  ngOnInit(): void {
    this.loadPerformers();
  }

  loadPerformers(): void {
    console.log('passe par loadPerformers')
    this._musicService.getPerformers(this.currentPage * this.pageSize, this.pageSize).subscribe(data => {
      this.performers = data.results;
      this.hasNextPage = !!data.next;
    });
  }

  loadPerformerDetail(performer: PerformerDetail): void {
    const id = performer.url.split('/').slice(-2, -1)[0];
    this._musicService.getPerformerDetail(id).subscribe(
      detail => this.selectedperformer = detail
    )
  }

  loadPerformerMusics(music: MusicDetail): void {
    const name = music.performer_name;
    this._musicService.getPerformerMusics(name).subscribe(
      detail => this.performerMusics = detail
    )
  }

  nextPage(): void {
    if (this.hasNextPage) {
      this.currentPage++;
      this.loadPerformers();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPerformers();
    }
  }

  onSearch(searchTerm: string): void {
    if (searchTerm) {
      this._musicService.searchPerformer(searchTerm).subscribe(
        data => this.performers = data.results
      );
    } else {
      this.loadPerformers();
    }
  }
}
