import { DeezerArtist } from "./deezerArtist.model";
import { DeezerAlbum } from "./deezerAlbum.model";

export class DeezerSong {

    constructor(
        public title?: string,
        public album?: DeezerAlbum,
        public artist?: DeezerArtist,
        public id?: string
    ) {
    }
}
