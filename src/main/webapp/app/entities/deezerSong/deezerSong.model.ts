import { DeezerArtist } from "./deezerArtist.model";
import { DeezerAlbum } from "./deezerAlbum.model";
import { SanitizableDeezerObject } from "../../shared/utils/sanitizable.interface";
import { SafeResourceUrl } from "@angular/platform-browser";

export class DeezerSong implements SanitizableDeezerObject {

    deezerRef: string;
    sanitizedUrl: SafeResourceUrl;

    constructor(
        public title?: string,
        public album?: DeezerAlbum,
        public artist?: DeezerArtist,
        public id?: string
    ) {
    }

}
