import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-performer-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './performer-search.component.html',
  styleUrl: './performer-search.component.scss'
})
export class PerformerSearchComponent {
  @Output() searchChange = new EventEmitter<{name: string; genre:string}>();
  @Input() placeHolderName : string = "";
  @Input() placeHolderGenre: string = "";
  searchTermName: string = '';
  searchTermGenre: string = ''

  // Subject pour implémenter le debounce
  private searchSubject = new Subject<{name: string; genre: string}>();

  constructor() {
    // Configuration du debounce pour la recherche
    this.searchSubject.pipe(
      debounceTime(300), // Attend 300ms après la dernière frappe
      distinctUntilChanged() // Évite les recherches en double
    ).subscribe(term => {
      this.searchChange.emit(term);
    });
  }

  /**
   * Gère les changements dans le champ de recherche
   */
  onSearchChange(): void {
    this.searchChange.emit({name: this.searchTermName, genre: this.searchTermGenre});
  }
}
