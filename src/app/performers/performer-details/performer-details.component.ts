import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MusicsService } from '../../services/musics.service'; 
import { PerformerDetail } from '../../models/performers.models';
import { RouterLink } from '@angular/router';
import { MusicList } from '../../models/musics.models';
import { MusicsListComponent } from '../../musics/musics-list/musics-list.component';
@Component({
  selector: 'app-performer-details',
  standalone: true,
  imports: [CommonModule, RouterLink, MusicsListComponent],
  templateUrl: './performer-details.component.html',
  styleUrl: './performer-details.component.scss'
})
export class PerformerDetailsComponent {
  performerId!: string;
  performer!: PerformerDetail;
  performerMusics: MusicList | null =null;

  constructor(private route: ActivatedRoute, private musicsService: MusicsService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.performerId = params.get('id')!;
      

      this.fetchPerformerDetails(this.performerId);
      console.log(this.performer)
    });
  }

  fetchPerformerDetails(id: string): void {
    this.musicsService.getPerformerDetail(id).subscribe((performer) => {
      this.performer = performer;
    
    });
  }

  // loadPerformerMusics(name: string): void {
    
  //   this.musicsService.getPerformerMusics(name).subscribe(
  //     detail => this.performerMusics = detail
  //   )
  // }
}
