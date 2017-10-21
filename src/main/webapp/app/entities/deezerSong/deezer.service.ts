import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { ResponseWrapper } from '../../shared';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DeezerService {

    constructor(private http: Http) { }

    search(req: string): Observable<ResponseWrapper> {
        const uri = 'search?q=' + req;

        return this.http.get(uri)
            .map((res: Response) => this.convertResponse(res))

    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

}
