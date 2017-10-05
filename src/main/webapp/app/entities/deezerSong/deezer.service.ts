import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { ResponseWrapper } from '../../shared';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DeezerService {

    constructor(private http: Http) { }

    search(req: string): Observable<ResponseWrapper> {
        console.log('deezer service search( : ' + req);
        const uri = 'search?q=' + req;

        return this.http.get(uri)
            .map((res: Response) => this.convertResponse(res))

    }

    private convertResponse(res: Response): ResponseWrapper {
        console.log('convertResponse()');
        const jsonResponse = res.json();
        console.dir(jsonResponse);
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

}
