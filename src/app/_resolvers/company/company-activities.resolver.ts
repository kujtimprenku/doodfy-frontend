import {Activity} from '../../_models/activity';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {CompanyService} from '../../_services/company.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CompanyActivitiesResolver implements Resolve<Activity[]> {
    constructor(private companyService: CompanyService, private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Activity[]> {
        return this.companyService.getActivitiesByCompanyId(route.parent.params['id']).pipe(
            catchError(error => {
                console.log('Error retrieving company activities');
                this.router.navigate(['/start']);
                return of(null);
            })
        );
    }
}
