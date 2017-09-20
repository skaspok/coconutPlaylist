import { Component, Input } from '@angular/core';
import { Song } from './song.model';
import { SongService } from './song.service';
import { CommentService } from '../comment/comment.service';
import { Comment } from '../comment/comment.model';
import { Http, Response } from '@angular/http';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-add-comment',
    templateUrl: './comment-add.component.html'
})
export class CommentAddComponent {

    @Input()
    song: Song;
    newComment?: string;

    constructor(
        private commentService: CommentService,
    ) {
    }

    onAddComment() {
        console.log('add comment : ' + this.newComment);
        this.commentService.addComment(this.newComment, this.song.id).subscribe((res: Response) => {
            const wrapp = new ResponseWrapper(res.headers, res.json(), res.status);
            if (wrapp.status === 200) {
                this.song.comments.push(wrapp.json);
            }
        });
    }
}
