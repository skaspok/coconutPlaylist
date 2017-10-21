import { Component, OnInit, Input } from '@angular/core';
import { DeezerSong } from './deezerSong.model';
import { ResponseWrapper } from '../../shared/index';
import { DeezerService } from './deezer.service';
import { JhiAlertService } from 'ng-jhipster';
import { Song } from '../song/song.model';
import { SanitizeService } from './../../shared/utils/deezer.sanitize.service';

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
        private deezerService: DeezerService,
        private alertService: JhiAlertService,
        private sanitizer: SanitizeService
    ) {
    }

    startSearch() {
        if (this.search === '') {
            // un truc?
        } else {
            this.deezerService.search(this.search).subscribe(
                (res: ResponseWrapper) => {
                    this.deezerSongs = res.json.data;
                    for (let i = 0; i < this.deezerSongs.length; i++) {
                        this.deezerSongs[i].deezerRef = this.deezerSongs[i].id;
                        this.sanitizer.sanitizeSong(this.deezerSongs[i]);
                    }
                },
                (res: ResponseWrapper) => this.onError(res.json)
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
