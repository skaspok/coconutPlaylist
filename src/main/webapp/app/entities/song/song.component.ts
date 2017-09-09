import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { Song } from './song.model';
import { SongService } from './song.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'jhi-song',
    templateUrl: './song.component.html'
})
export class SongComponent implements OnInit, OnDestroy {
    static DEEZER_LINK: string = 'http://www.deezer.com/plugins/player?format=square&autoplay=false&playlist=false&width=80&'
    + 'height=80&color=007FEB&layout=dark&size=small&type=tracks&id=[song.deezerRef]&app_id=1';

    songs: Song[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private songService: SongService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private sanitizer: DomSanitizer
    ) {
    }

    loadAll() {
        this.songService.query().subscribe(
            (res: ResponseWrapper) => {
                this.songs = res.json;
                for (let i = 0; i < this.songs.length; i++) {
                    this.sanitizeSong(this.songs[i]);
                }
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    onAddComment() {
        console.log('add comment');
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
    private sanitizeSong(song: Song) {
        const url = SongComponent.DEEZER_LINK.replace('[song.deezerRef]', song.deezerRef);
        song.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
