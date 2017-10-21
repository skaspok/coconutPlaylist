import { BaseEntity, User } from './../../shared';
import { SanitizableDeezerObject } from './../../shared/utils/sanitizable.interface';
import { Comment } from './../comment';

import { SafeResourceUrl } from '@angular/platform-browser';

export class Song implements BaseEntity, SanitizableDeezerObject {

    public sanitizedUrl: SafeResourceUrl = null;

    constructor(
        public deezerRef?: string,
        public id?: number,
        public date?: any,
        public comments?: Comment[],
        public addingUser?: User,

    ) {
    }
}
