import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicsService } from '../../services/musics.service';
import { MusicDetail } from '../../models/musics.models';
import { PerformerList, PerformerDetail } from '../../models/performers.models';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { compileNgModule } from '@angular/compiler';

@Component({
  selector: 'app-music-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './music-add.component.html',
  styleUrl: './music-add.component.scss'
})
export class MusicAddComponent implements OnInit {

  musicForm!: FormGroup;
  musicDetail!: MusicDetail;
  performers: PerformerDetail[] = [];


  constructor(
    private fb: FormBuilder,
    private musicsService: MusicsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    
    this.musicForm = this.fb.group({
      title: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900)]],
      genre: ['', Validators.required],
      performer_id: ['', Validators.required]
    });

    this.musicsService.getPerformers().subscribe({
      next: (performers) => {
        this.performers = performers.results;
      },
      error: () => {
        alert('Unable to fetch performers list.');
      }
    });
  }

  onSubmit(): void {
    if (this.musicForm.valid) {
      const music = this.musicDetail

      this.musicsService.addMusic(music).subscribe({
        next: () => {
          alert('Music added successfully!');
          this.router.navigate(['/musics']);
        },
        error: () => {
          alert('Failed to add the music. Please try again.');
        }

      })
    }
  }

}