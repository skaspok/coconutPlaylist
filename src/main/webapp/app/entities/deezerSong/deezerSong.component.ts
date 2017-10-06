import { Component, OnInit, Input } from "@angular/core";
import { DeezerSong } from "./deezerSong.model";
import { ResponseWrapper } from "../../shared/index";
import { DeezerService } from "./deezer.service";
import { JhiAlertService } from "ng-jhipster";
import { Song } from "../song/song.model";

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
    ) {
    }

    startSearch() {
        console.log('startSearch()');
        if (this.search === '') {
            // un truc?
        } else {
            this.deezerService.search(this.search).subscribe(
                (res: ResponseWrapper) => {
                    this.deezerSongs = res.json.data;
                },
                (res: ResponseWrapper) => this.onError(res.json)
            );
        }
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    addSong(input: DeezerSong) {
        console.log('add deezer song :' + input.id);
        console.dir(input);
        this.song.deezerRef = input.id;
        this.deezerSongs = new Array<DeezerSong>();

    }
}
