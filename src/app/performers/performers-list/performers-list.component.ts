import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformerSearchComponent } from '../performer-search/performer-search.component';
import { PerformerDetailsComponent } from '../performer-details/performer-details.component';
import { MusicsService } from '../../services/musics.service';
import { MusicDetail, MusicList } from '../../models/musics.models';
import { PerformerDetail } from '../../models/performers.models';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-performers-list',
  standalone: true,
  imports: [CommonModule, RouterLink, PerformerSearchComponent],
  templateUrl: './performers-list.component.html',
  styleUrl: './performers-list.component.scss'
})
export class PerformersListComponent {
  constructor(private _musicService: MusicsService, public readonly router: Router){}

  performers : PerformerDetail[] = [];
  selectedperformer: PerformerDetail | null = null;
  performerMusics: MusicList | null =null;
  searchTermName?: string = '';
  searchTermGenre?: string = ''
  
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

  onSearch(searchTerm?: string, searchTermGenre?: string): void {
    this.searchTermName = searchTerm
    this.searchTermGenre = searchTermGenre
    this._musicService.searchPerformer(searchTerm, searchTermGenre).subscribe(
      data => {
        this.performers = data.results;
        this.hasNextPage = !!data.next
        
      });
  }
}
