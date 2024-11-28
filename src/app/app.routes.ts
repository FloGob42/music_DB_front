import { Routes } from '@angular/router';
import { MusicsListComponent } from './musics/musics-list/musics-list.component';
import { MusicDetailsComponent } from './musics/music-details/music-details.component';
import { PerformersListComponent } from './performers/performers-list/performers-list.component';
import { PerformerDetailsComponent } from './performers/performer-details/performer-details.component';


export const routes: Routes = [
    {path: 'musics', component: MusicsListComponent},
    {path: 'musics/:id', component: MusicDetailsComponent},
    {path: 'performers', component: PerformersListComponent},
    {path: 'performers/:id', component: PerformerDetailsComponent},
];
