import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicDetail } from '../../models/musics.models'; 
import { MusicsService } from '../../services/musics.service'; 
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-music-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './music-details.component.html',
  styleUrls: ['./music-details.component.scss'] 
})
export class MusicDetailsComponent {
  musicId!: string;
  music!: MusicDetail; 

  constructor(private route: ActivatedRoute, private musicsService: MusicsService,  public readonly router: Router) {}

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

  deleteMusic(id:string): void {
    this.musicsService.deleteMusic(id).subscribe((music)=> {
      this.music = music
    })
  }

  // updateMusic(id:string): void{
  //   this.musicsService.updateMusic(id).subscribe((music)=> {
  //     this.music = music
  //   })
  // }
}


