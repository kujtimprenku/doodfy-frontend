import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Activity} from '../_models/activity';
import {Comment} from '../_models/comment';
import {environment} from '../../environments/environment';
import {Group} from '../_models/group';
import {Place} from '../_models/place';


@Injectable({
    providedIn: 'root'
})
export class PlaceService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    activityPlace(id: number) {
        return this.http.get(this.baseUrl + 'place/' + id);
    }

    getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(this.baseUrl + 'getPlaces');
    }

    placeActivities(id: number): Observable<Activity[]> {
        return this.http.get<Activity[]>(this.baseUrl + 'placeActivities/' + id);
    }
}

