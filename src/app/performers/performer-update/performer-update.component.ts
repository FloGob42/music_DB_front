import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicsService } from '../../services/musics.service';
import { MusicDetail } from '../../models/musics.models';
import { PerformerList, PerformerDetail } from '../../models/performers.models';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-performer-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './performer-update.component.html',
  styleUrl: './performer-update.component.scss'
})
export class PerformerUpdateComponent implements OnInit{
  performerForm!: FormGroup;
  performerDetail!: PerformerDetail;
  performerId!: number;
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private musicsService: MusicsService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit():void{

    this.performerId = Number(this.route.snapshot.paramMap.get('id'));

    this.performerForm = this.fb.group({
      name: ['', Validators.required],
      genre: ['', Validators.required],
      origin: ['', Validators.required],
      birth_date: [''],
      formation_year: ['']

    })

    this.musicsService.getPerformerDetail(this.performerId).subscribe({

      next: (performer)=> {
        this.performerDetail = performer;
        this.performerForm.patchValue({
          name: performer.name,
          genre: performer.genre,
          origin: performer.origin,
          birth_date: performer.birth_date,
          formation_year: performer.formation_year
        })
        this.isLoading = false
      },
      error: ()=>{
        alert('unable to fetch performer details');
        this.router.navigate(['/performers']);
      }

    })

    
  }

  onSubmit(): void {
    if (this.performerForm.valid){
      const updatedPerformer = {
        ...this.performerDetail,
        ...this.performerForm.value
      };

      if (this.performerId){
        this.musicsService.updatePerformer(updatedPerformer).subscribe({
          next:()=>{
            alert('performer updated successfully!');
            this.router.navigate(['/performers']);
          },
          error: ()=>{
            alert('failed to load performer. Please try again.')
          }
        })
      }
    }
  }


}
