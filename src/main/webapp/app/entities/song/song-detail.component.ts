import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager  } from 'ng-jhipster';

import { Song } from './song.model';
import { SongService } from './song.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
    selector: 'jhi-song-detail',
    templateUrl: './song-detail.component.html'
})
export class SongDetailComponent implements OnInit, OnDestroy {

    static DEEZER_LINK: string = 'http://www.deezer.com/plugins/player?format=square&autoplay=false&playlist=false&width=80&'
    + 'height=80&color=007FEB&layout=dark&size=small&type=tracks&id=[song.deezerRef]&app_id=1';

    song: Song;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    public sanitizedUrl: SafeResourceUrl;

    constructor(
        private eventManager: JhiEventManager,
        private songService: SongService,
        private route: ActivatedRoute,
        private domSanitizer: DomSanitizer,

    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSongs();
    }

    load(id) {
        this.songService.find(id).subscribe((song) => {
            this.song = song;

            let url = SongDetailComponent.DEEZER_LINK.replace('[song.deezerRef]', song.deezerRef);
            this.sanitizedUrl =  this.domSanitizer.bypassSecurityTrustResourceUrl(url);
        });
      
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSongs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'songListModification',
            (response) => this.load(this.song.id)
        );
    }
}
