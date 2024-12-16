import { Routes } from '@angular/router';
import { MusicsListComponent } from './musics/musics-list/musics-list.component';
import { MusicDetailsComponent } from './musics/music-details/music-details.component';
import { PerformersListComponent } from './performers/performers-list/performers-list.component';
import { PerformerDetailsComponent } from './performers/performer-details/performer-details.component';
import { MusicUpdateComponent } from './musics/music-update/music-update.component';
import { MusicAddComponent } from './musics/music-add/music-add.component';
import { PerformerUpdateComponent } from './performers/performer-update/performer-update.component';
import { PerformerAddComponent } from './performers/performer-add/performer-add.component';

export const routes: Routes = [
    {path: 'musics', component: MusicsListComponent},
    {path: 'musics/add', component: MusicAddComponent},
    {path: 'musics/:id', component: MusicDetailsComponent},
    {path: 'performers', component: PerformersListComponent}, 
    {path: 'performers/add', component: PerformerAddComponent},
    {path: 'performers/:id', component: PerformerDetailsComponent},
    {path: 'musics/update/:id', component: MusicUpdateComponent},
    {path: 'performers/update/:id', component: PerformerUpdateComponent},
];
