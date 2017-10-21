import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { Song } from './song.model';
import { SongService } from './song.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SanitizeService } from './../../shared/utils/deezer.sanitize.service';

@Component({
    selector: 'jhi-song',
    templateUrl: './song.component.html'
})
export class SongComponent implements OnInit, OnDestroy {

    songs: Song[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private songService: SongService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private sanitizer: SanitizeService,
    ) {
    }

    loadAll() {
        this.songService.query().subscribe(
            (res: ResponseWrapper) => {
                this.songs = res.json;
                for (let i = 0; i < this.songs.length; i++) {
                    this.sanitizer.sanitizeSong(this.songs[i]);
                }
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSongs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Song) {
        return item.id;
    }
    registerChangeInSongs() {
        this.eventSubscriber = this.eventManager.subscribe('songListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
