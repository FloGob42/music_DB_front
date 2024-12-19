import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonEngine } from '@angular/ssr';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss'
})
export class UserRegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    // Initialisation du formulaire
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;

      this.userService.register(userData).subscribe({
        next: () => {
          alert('Utilisateur enregistré avec succès!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Erreur lors de l\'enregistrement :', err);
          alert('Erreur lors de l\'enregistrement. Veuillez réessayer.');
        },
      });
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
  }
}
