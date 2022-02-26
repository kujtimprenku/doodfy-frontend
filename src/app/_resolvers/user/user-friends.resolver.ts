import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {UserService} from '../../_services/user.service';
import {User} from '../../_models/user';

@Injectable({
    providedIn: 'root'
})
export class UserFriendsResolver implements Resolve<User[]> {
    constructor(private userService: UserService, private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUserFriends(route.parent.params['id']).pipe(
            catchError(error => {
                console.log(error);
                this.router.navigate(['/start']);
                return of(null);
            })
        );
    }
}
