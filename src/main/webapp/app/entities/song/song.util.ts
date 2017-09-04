import { Song } from './song.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export class SongUtil {

    static DEEZER_LINK: string = 'http://www.deezer.com/plugins/player?format=square&autoplay=false&playlist=false&width=80&'
    + 'height=80&color=007FEB&layout=dark&size=small&type=tracks&id=[song.deezerRef]&app_id=1';

    private static sanitizer: DomSanitizer;

    public static sanitizeSong(song: Song) {
        const url = SongUtil.DEEZER_LINK.replace('[song.deezerRef]', song.deezerRef);
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
