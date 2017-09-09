import { BaseEntity, User } from './../../shared';

export class Comment implements BaseEntity {
    constructor(
        public id?: number,
        public text?: string,
        public date?: any,
        public song?: BaseEntity,
        public user?: User,
    ) {
    }
}
