import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {User} from '../../_models/user';
import {UserService} from '../../_services/user.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class UserDetailResolver implements Resolve<User> {
    constructor(private userService: UserService, private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUserById(route.params['id']).pipe(
            catchError(error => {
                console.log('Error retrieving user details');
                this.router.navigate(['/start']);
                return of(null);
            })
        );
    }
}
