import { Component, OnInit, Input } from '@angular/core';
import { DeezerSong } from './deezerSong.model';
import { ResponseWrapper } from '../../shared/index';
import { JhiAlertService } from 'ng-jhipster';
import { Song } from '../song/song.model';
import { SanitizeService } from './../../shared/utils/deezer.sanitize.service';
import { DeezerApiService } from 'angular-deezer-api';

@Component({
    selector: 'jhi-deezer-song',
    templateUrl: './deezer-song.component.html'
})
export class DeezerSongComponent {

    deezerSongs: DeezerSong[];
    search: string;

    @Input()
    song: Song;

    constructor(
        private alertService: JhiAlertService,
        private sanitizer: SanitizeService,
        private deezerApiService: DeezerApiService
    ) {
    }

    startSearch() {
        if (this.search === '') {
            // un truc?
        } else {
            this.deezerApiService.search(this.search).then(
                (res: any) => {
                    this.deezerSongs = res.data;
                    for (let i = 0; i < this.deezerSongs.length; i++) {
                        this.deezerSongs[i].deezerRef = this.deezerSongs[i].id;
                        this.sanitizer.sanitizeSong(this.deezerSongs[i]);
                    }
                },
                (res: any) => this.onError(res)
            );
        }
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    addSong(input: DeezerSong) {
        this.song.deezerRef = input.id;
        this.deezerSongs = new Array<DeezerSong>();
    }
}
