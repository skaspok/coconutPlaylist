import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoconutPlaylistSharedModule } from '../../shared';
import { CoconutPlaylistAdminModule } from '../../admin/admin.module';
import {
    SongService,
    SongPopupService,
    SongComponent,
    SongCommentsComponent,
    CommentAddComponent,
    SongDetailComponent,
    SongDialogComponent,
    SongPopupComponent,
    SongDeletePopupComponent,
    SongDeleteDialogComponent,
    songRoute,
    songPopupRoute,
} from './';
import { DeezerService } from '../deezerSong/deezer.service';
import { DeezerSongComponent } from '../deezerSong/deezerSong.component';

const ENTITY_STATES = [
    ...songRoute,
    ...songPopupRoute,
];

@NgModule({
    imports: [
        CoconutPlaylistSharedModule,
        CoconutPlaylistAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SongComponent,
        SongCommentsComponent,
        CommentAddComponent,
        SongDetailComponent,
        SongDialogComponent,
        SongDeleteDialogComponent,
        SongPopupComponent,
        SongDeletePopupComponent,
        DeezerSongComponent
    ],
    entryComponents: [
        SongComponent,
        SongCommentsComponent,
        CommentAddComponent,
        SongDialogComponent,
        SongPopupComponent,
        SongDeleteDialogComponent,
        SongDeletePopupComponent,
        DeezerSongComponent
    ],
    providers: [
        SongService,
        SongPopupService,
        DeezerService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoconutPlaylistSongModule { }
