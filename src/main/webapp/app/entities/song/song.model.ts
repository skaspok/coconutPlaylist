import { BaseEntity } from './../../shared';

export class Song implements BaseEntity {
    constructor(
        public id?: number,
        public deezerRef?: string,
        public date?: any,
        public comment?: BaseEntity,
    ) {
    }
}
