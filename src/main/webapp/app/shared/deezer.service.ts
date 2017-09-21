import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DeezerService {

    constructor(private http: Http) { }

    search(req: string) {
        console.log('deezer service search()');
        // const uri = 'search';
        const uri = 'search?q=' + req;

        this.http.get(uri)
            .map((res: Response) => res.json())
            .subscribe((res) => {
                console.dir(res)
            });
    }
}
