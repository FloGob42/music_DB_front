import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-music-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './music-search.component.html',
  styleUrl: './music-search.component.scss'
})
export class MusicSearchComponent {
  @Output() searchChange = new EventEmitter<{ title: string; genre: string }>();
  @Input() placeHolderTitle: string = "";
  @Input() placeHolderGenre: string = "";
  searchTermTitle: string = '';
  searchTermGenre: string = ''

  // Subject pour implémenter le debounce
  private searchSubject = new Subject<{ title: string; genre: string }>();

  constructor() {
    // Configuration du debounce pour la recherche
    this.searchSubject.pipe(
      debounceTime(1000), // Attend 1000ms après la dernière frappe
      // distinctUntilChanged() // Évite les recherches en double
    ).subscribe(term => {
      this.searchChange.emit(term);
    });
  }

  /**
   * Gère les changements dans le champ de recherche
   */
  onSearchChange(): void {

    this.searchChange.emit({ title: this.searchTermTitle, genre: this.searchTermGenre });
  }


}
