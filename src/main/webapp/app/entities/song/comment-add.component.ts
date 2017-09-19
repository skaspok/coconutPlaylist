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
    song2: Comment;
    newComment?: string;

    constructor(
        private commentService: CommentService,
    ) {
    }

    onAddComment() {
        console.log('add comment : ' + this.newComment);
        this.commentService.addComment(this.newComment, this.song.id);
    }
}
