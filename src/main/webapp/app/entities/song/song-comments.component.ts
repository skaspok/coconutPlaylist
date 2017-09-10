import { Component, Input } from '@angular/core';
import { Song } from './song.model';

@Component({
    selector: 'jhi-song-comments',
    templateUrl: './song-comments.component.html'
})
export class SongCommentsComponent {

    @Input()
    song: Song;

    constructor(
    ) {
    }

    onAddComment() {
        console.log('add comment');
    }
}
