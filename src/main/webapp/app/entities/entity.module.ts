import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CoconutPlaylistSongModule } from './song/song.module';
import { CoconutPlaylistCommentModule } from './comment/comment.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        CoconutPlaylistSongModule,
        CoconutPlaylistCommentModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoconutPlaylistEntityModule {}
