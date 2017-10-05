import { Component, OnInit } from "@angular/core";
import { DeezerSong } from "./deezerSong.model";
import { ResponseWrapper } from "../../shared/index";
import { DeezerService } from "./deezer.service";
import { JhiAlertService } from "ng-jhipster";

@Component({
    selector: 'jhi-deezer-song',
    templateUrl: './deezer-song.component.html'
})
export class DeezerSongComponent {

    deezerSongs: DeezerSong[];
    search: string;

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
}
