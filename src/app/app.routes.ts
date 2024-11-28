import { Routes } from '@angular/router';
import { MusicsListComponent } from './musics/musics-list/musics-list.component';
import { MusicDetailsComponent } from './musics/music-details/music-details.component';


export const routes: Routes = [
    {path: 'musics', component: MusicsListComponent},
    {path: 'musics/:id', component: MusicDetailsComponent},
];
