import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Response, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Song } from './song.model';
import { SongPopupService } from './song-popup.service';
import { SongService } from './song.service';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';
import { DeezerService } from '../deezerSong/deezer.service';
import { DeezerSong } from '../deezerSong/deezerSong.model';

@Component({
    selector: 'jhi-song-dialog',
    templateUrl: './song-dialog.component.html'
})
export class SongDialogComponent implements OnInit {

    song: Song;
    isSaving: boolean;
    search: string;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private songService: SongService,
        private userService: UserService,
        private eventManager: JhiEventManager,
        private deezerService: DeezerService
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        console.log('save song');
        this.isSaving = true;
        if (this.song.id !== undefined) {
            this.subscribeToSaveResponse(
                this.songService.update(this.song));
        } else {
            this.subscribeToSaveResponse(
                this.songService.create(this.song));
        }
    }

    startSearch() {
        console.log('startSearch()');
        if (this.search === '') {
            //un truc?
        } else {
            this.deezerService.search(this.search).subscribe(
                (res: ResponseWrapper) => {
                    //console.dir(res.json);
                    let deezerSong: DeezerSong[];
                    deezerSong = res.json.data;
                    // console.dir(deezerSong[0]);
                },
                (res: ResponseWrapper) => this.onError(res.json)
            );
        }
    }

    private subscribeToSaveResponse(result: Observable<Song>) {
        result.subscribe((res: Song) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Song) {
        this.eventManager.broadcast({ name: 'songListModification', content: 'OK' });
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

    trackUserById(index: number, item: User) {
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
    ) { }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
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
