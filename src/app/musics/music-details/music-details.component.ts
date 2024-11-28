import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MusicDetail } from '../../models/musics.models'; 
import { MusicsService } from '../../services/musics.service'; 

@Component({
  selector: 'app-music-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './music-details.component.html',
  styleUrls: ['./music-details.component.scss'] 
})
export class MusicDetailsComponent {
  musicId!: string;
  music!: MusicDetail; 

  constructor(private route: ActivatedRoute, private musicsService: MusicsService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.musicId = params.get('id')!;
      

      this.fetchMusicDetails(this.musicId);
    });
  }

  fetchMusicDetails(id: string): void {
    this.musicsService.getMusicDetail(id).subscribe((music) => {
      this.music = music;
    
    });
  }
}


