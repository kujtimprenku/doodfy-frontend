import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class XpService {
    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    giveXpToUser(model: any) {
        return this.http.post(this.baseUrl + 'xpPoint', model);
    }

    giveXpToAll(model: any) {
        return this.http.post(this.baseUrl + 'xpAll', model);
    }
}
