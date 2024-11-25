import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicDetail } from '../../../models/musics.models';
import { Router } from '@angular/router';


@Component({
  selector: 'app-music-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './music-details.component.html',
  styleUrl: './music-details.component.scss'
})
export class MusicDetailsComponent {
  @Input({ required: true }) music!: MusicDetail;
}
