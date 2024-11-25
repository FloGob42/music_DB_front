import { Routes } from '@angular/router';
import { MusicsListComponent } from './musics/components/musics-list/musics-list.component';
import { MusicDetailsComponent } from './musics/components/music-details/music-details.component';


export const routes: Routes = [
    {path: 'musics', component: MusicsListComponent},
    {path: 'musics/:id>', component: MusicDetailsComponent},
];
