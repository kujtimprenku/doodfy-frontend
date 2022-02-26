import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ActivityService} from '../../_services/activity.service';
import {ExploreService} from '../../_services/explore.service';

@Injectable({
    providedIn: 'root'
})
export class ExploreResolver implements Resolve<any> {
    constructor(private exploreService: ExploreService,
                private activityService: ActivityService,
                private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot) {

        if (route.queryParamMap.get('search') !== null) {
            const model = {
                search: route.queryParamMap.get('search')
            };

            return this.exploreService.getSearchResult(model).pipe(
                catchError(error => {
                    console.log(error);
                    console.log('Error while retrieving data of search results');
                    this.router.navigate(['/start']);
                    return of(null);
                })
            );
        } else {

            const model = {
                city: route.queryParamMap.get('city'),
                category: route.queryParamMap.get('category'),
                cat: route.queryParamMap.get('cat'),
                from: route.queryParamMap.get('from'),
                to: route.queryParamMap.get('to'),
            };

            return this.exploreService.searchFilters(model).pipe(
                catchError(error => {
                    console.log(error);
                    console.log('Error while retrieving data of search results');
                    this.router.navigate(['/start']);
                    return of(null);
                })
            );
        }

    }
}
