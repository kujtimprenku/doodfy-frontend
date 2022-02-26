import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {GroupService} from '../../_services/group.service';
import {Group} from '../../_models/group';

@Injectable({
    providedIn: 'root'
})

export class GroupDetailResolver implements Resolve<Group> {
    constructor(private groupService: GroupService, private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Group> {
        const type = route.url[0].path;
        return this.groupService.getGroupById(route.params['id'], type ).pipe(
            catchError(error => {
                console.log('Error retrieving group details');
                this.router.navigate(['/start']);
                return of(null);
            })
        );

    }
}
