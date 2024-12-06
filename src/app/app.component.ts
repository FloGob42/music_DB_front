import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { RouterLink } from '@angular/router';
import { MusicsService } from './services/musics.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private _musicService: MusicsService, public readonly router: Router){}
  title = 'music_DB_front';

}
