import { Component, Input } from '@angular/core';
import { Song } from './song.model';
import { SongService } from './song.service';
import { CommentService } from '../comment/comment.service';
import { Comment } from '../comment/comment.model';

@Component({
    selector: 'jhi-add-comment',
    templateUrl: './comment-add.component.html'
})
export class CommentAddComponent {

    @Input()
    song: Song;
    newComment: string;

    constructor(
        private songService: SongService,
        private commentService: CommentService,
    ) {
    }

    onAddComment() {
        console.log('add comment : ' + this.newComment);
        const comment = new Comment();
        comment.text = this.newComment;
        comment.song = this.song;

        // this.song.comments.push(comment);
        this.commentService.create(comment);
    }
}
