import { Component, Input } from '@angular/core';
import { Song } from './song.model';

@Component({
    selector: 'jhi-song-comments',
    templateUrl: './song-comments.component.html',
    styles: [`
        .gradient-transparent{
            background: -webkit-gradient(linear, left top, left bottom, from(#fff), to(#eee), color-stop(0.75, #eee));
        }

        .test-absolute{
            //background: -webkit-gradient(linear, left top, left bottom, from(#fff), to(#eee), color-stop(0.75, #eee));
            background-color: #555,
            position: absolute
        }
    `]
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
