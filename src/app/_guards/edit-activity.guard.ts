import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import { CanDeactivate } from '@angular/router/src/utils/preactivation';
import { CreateActivityComponent } from '../pages/create-activity/create-activity.component';

@Injectable({
    providedIn: 'root'
})
export class EditActivityGuard implements CanDeactivate {
    component: CreateActivityComponent;    route: ActivatedRouteSnapshot;

    canDeactivate(component: CreateActivityComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        if (component.isDirty) {
            return confirm('Navigate away and lose all changes?');
        }
        return true;
    }
}
