import { BaseEntity, User } from './../../shared';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export class Song implements BaseEntity {

    public sanitizedUrl: SafeResourceUrl = null;
    private sanitizer: DomSanitizer;

    constructor(
        public id?: number,
        public deezerRef?: string,
        public date?: any,
        public comments?: BaseEntity[],
        public addingUser?: User,

    ) {
    }
}
