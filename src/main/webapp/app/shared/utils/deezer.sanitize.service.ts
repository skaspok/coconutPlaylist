import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { SanitizableDeezerObject } from './sanitizable.interface';

@Injectable()
export class SanitizeService {

    static DEEZER_LINK: string = 'http://www.deezer.com/plugins/player?format=square&autoplay=false&playlist=false&width=80&'
    + 'height=80&color=007FEB&layout=dark&size=small&type=tracks&id=[song.deezerRef]&app_id=1';

    constructor(
        private sanitizer: DomSanitizer
    ) {
    }

    sanitizeSong(deezerSong: SanitizableDeezerObject): void {

        if (deezerSong.deezerRef !== undefined) {
            const url = SanitizeService.DEEZER_LINK.replace('[song.deezerRef]', deezerSong.deezerRef);
            deezerSong.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }
    }
}
