import { BaseEntity, User } from './../../shared';
import { Song } from '../song/song.model';

export class Comment implements BaseEntity {
    constructor(
        public id?: number,
        public text?: string,
        public date?: any,
        public song?: Song,
        public user?: User,
    ) {
    }
}
