import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {City} from '../_models/city';

@Injectable({
    providedIn: 'root'
})
export class ExploreService {
    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    getSearchResult(model: any) {
        return this.http.post(this.baseUrl + 'search', model);
    }

    autocomplete(model: any) {
        return this.http.post(this.baseUrl + 'autocomplete', model);
    }

    getCities(): Observable<City[]> {
        return this.http.get<City[]>(this.baseUrl + 'switzerlandCities');
    }

    searchFilters(model: any) {
        return this.http.post(this.baseUrl + 'searchFilters', model);
    }
}
