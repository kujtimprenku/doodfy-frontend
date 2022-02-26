import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Company} from '../../_models/company';
import {CompanyService} from '../../_services/company.service';

@Injectable({
    providedIn: 'root'
})

export class CompanyDetailResolver implements Resolve<Company> {
    constructor(private companyService: CompanyService, private router: Router) {
    }
    resolve(route: ActivatedRouteSnapshot): Observable<Company> {
        let id;

        if(route.parent.params['id']) {
            id = route.parent.params['id'];
        }else {
            id = route.params['id'];
        }
        return this.companyService.getCompanyById(id).pipe(
            catchError(error => {
                console.log('Error retrieving company details');
                this.router.navigate(['/start']);
                return of(null);
            })
        );
    }
}
