import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Activity} from '../_models/activity';
import {Company} from '../_models/company';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    getCompanies(): Observable<Company[]> {
        return this.http.get<Company[]>(this.baseUrl + 'companyFromMyCountry');
    }

    getActivitiesByCompanyId(id: number): Observable<Activity[]> {
        return this.http.get<Activity[]>(this.baseUrl + 'activitiesByCompany/' + id);
    }

    getCompanyById(id: number): Observable<Company> {
        return this.http.get<Company>(this.baseUrl + 'company/' + id);
    }

    subscribeCompany(id: number) {
        return this.http.get(this.baseUrl + 'subscribeCompany/' + id);
    }

    unSubscribeCompany(id: number) {
        return this.http.delete(this.baseUrl + 'unSubscribeCompany/' + id);
    }

    getCompanySubscribers(id: number) {
        return this.http.get(this.baseUrl + 'companySubscribers/' + id);
    }

    editCompany(model: any, id: number) {
        return this.http.put(this.baseUrl + 'company/' + id, model);
    }

}
