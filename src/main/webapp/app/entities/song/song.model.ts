import { BaseEntity, User } from './../../shared';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export class Song implements BaseEntity {

    static DEEZER_LINK: string = 'http://www.deezer.com/plugins/player?format=square&autoplay=false&playlist=false&width=80&'
    + 'height=80&color=007FEB&layout=dark&size=small&type=tracks&id=[song.deezerRef]&app_id=1';

    public sanitizedUrl: SafeResourceUrl = null;
    private sanitizer: DomSanitizer;

    constructor(
        public id?: number,
        public deezerRef?: string,
        public date?: any,
        public comment?: BaseEntity,
        public addingUser?: User,
    ) {
    }

    public getSanitizedUrl2() {
        console.log('getSanitizedUrl()')
        if (this.sanitizedUrl == null) {
            const url = Song.DEEZER_LINK.replace('[song.deezerRef]', this.deezerRef);
            this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }

    }
}