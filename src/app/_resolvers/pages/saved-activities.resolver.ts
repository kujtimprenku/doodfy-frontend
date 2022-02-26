import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Activity} from '../../_models/activity';
import {Injectable} from '@angular/core';
import {ActivityService} from '../../_services/activity.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SavedActivitiesResolver implements Resolve<Activity[]> {
    constructor(private activityService: ActivityService, private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Activity[]> {
        return this.activityService.getCurrentUserSavedActivities().pipe(
            catchError(error => {
                console.log('Error while retrieving data of saved activities');
                this.router.navigate(['/start']);
                return of(null);
            })
        );
    }
}
