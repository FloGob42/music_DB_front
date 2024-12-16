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
  selector: 'app-performer-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './performer-add.component.html',
  styleUrl: './performer-add.component.scss'
})
export class PerformerAddComponent implements OnInit{
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



    
  }

  onSubmit(): void {
    if (this.performerForm.valid){
      const updatedPerformer = this.performerDetail
        

      
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
