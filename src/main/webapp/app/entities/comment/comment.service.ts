import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { Comment } from './comment.model';
import { Song } from '../song/song.model';
import { ResponseWrapper, createRequestOption, User } from '../../shared';

@Injectable()
export class CommentService {

    private resourceUrl = 'api/comments';
    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(comment: Comment): Observable<Comment> {
        const copy = this.convert(comment);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(comment: Comment): Observable<Comment> {
        const copy = this.convert(comment);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Comment> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        console.log(' comment query');
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    addComment(commentText: string, songId: number): Observable<Response> {
        return this.http.post(`${this.resourceUrl}/add_song_comment/${songId}`, commentText);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.date = this.dateUtils
            .convertDateTimeFromServer(entity.date);
    }

    private convert(comment: Comment): Comment {
        const copy: Comment = Object.assign({}, comment);
        copy.date = this.dateUtils.toDate(comment.date);
        return copy;
    }

}
