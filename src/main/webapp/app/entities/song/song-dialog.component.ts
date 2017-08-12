import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Song } from './song.model';
import { SongPopupService } from './song-popup.service';
import { SongService } from './song.service';
import { Comment, CommentService } from '../comment';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-song-dialog',
    templateUrl: './song-dialog.component.html'
})
export class SongDialogComponent implements OnInit {

    song: Song;
    isSaving: boolean;

    comments: Comment[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private songService: SongService,
        private commentService: CommentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.commentService.query()
            .subscribe((res: ResponseWrapper) => { this.comments = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.song.id !== undefined) {
            this.subscribeToSaveResponse(
                this.songService.update(this.song));
        } else {
            this.subscribeToSaveResponse(
                this.songService.create(this.song));
        }
    }

    private subscribeToSaveResponse(result: Observable<Song>) {
        result.subscribe((res: Song) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Song) {
        this.eventManager.broadcast({ name: 'songListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackCommentById(index: number, item: Comment) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-song-popup',
    template: ''
})
export class SongPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private songPopupService: SongPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.songPopupService
                    .open(SongDialogComponent as Component, params['id']);
            } else {
                this.songPopupService
                    .open(SongDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
