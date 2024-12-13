import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicsService } from '../../services/musics.service';
import { MusicDetail } from '../../models/musics.models';
import { PerformerList, PerformerDetail } from '../../models/performers.models';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-music-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './music-update.component.html',
  styleUrls: ['./music-update.component.scss']
})
export class MusicUpdateComponent implements OnInit {
  musicForm!: FormGroup;
  musicDetail!: MusicDetail;
  performers: PerformerDetail[] = []; // List of performers
  musicId!: number;
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private musicsService: MusicsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.musicId = Number(this.route.snapshot.paramMap.get('id'));


    this.musicForm = this.fb.group({
      title: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900)]],
      genre: ['', Validators.required],
      performer_id: ['', Validators.required]
    });

    // if (this.musicId) {
      this.musicsService.getMusicDetail(this.musicId).subscribe({
        next: (music) => {
          this.musicDetail = music;
          this.musicForm.patchValue({
            title: music.title,
            year: music.year,
            genre: music.genre,
            performer_id: music.performer_id,
            
          });
          this.isLoading = false
        },
        error: () => {
          alert('Unable to fetch music details.');
          this.router.navigate(['/musics']);
        }
      })
    // };


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

      const updatedMusic = {
        ...this.musicDetail,
        ...this.musicForm.value
      };

      if (this.musicId) {
        this.musicsService.updateMusic(updatedMusic).subscribe({
          next: () => {
            alert('Music updated successfully!');
            this.router.navigate(['/musics']);
          },
          error: () => {
            alert('Failed to update the music. Please try again.');
          }

        })
      }

      
      }
    }
  }

