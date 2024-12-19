import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { RouterLink } from '@angular/router';
import { MusicsService } from './services/musics.service';
import { UserService } from './services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private _musicService: MusicsService, public readonly router: Router, public userService: UserService){}
  title = 'music_DB_front';

  onLogout(): void {
    this.userService.logout();
  }

}
