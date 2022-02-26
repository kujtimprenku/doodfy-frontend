import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ActivityService} from '../_services/activity.service';
import {GroupService} from '../_services/group.service';
import {CompanyService} from '../_services/company.service';
import {Activity} from '../_models/activity';
import {Group} from '../_models/group';
import {Company} from '../_models/company';

@Injectable({
    providedIn: 'root'
})
export class CanEditGuard implements CanActivate {


    constructor(
        private router: Router,
        private activityService: ActivityService,
        private groupService: GroupService,
        private companyService: CompanyService) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const url = next.url[0].path;

        if (url === 'activity') {
            return this.activityService.activityEditInfo(+next.params['id']).pipe(
                map((data: Activity) => {
                    if (data.my_activity) {
                        return true;
                    } else {
                        this.router.navigate(['/start']);
                        return false;
                    }
                }));
        }

        if (url === 'club' || url === 'group') {
            return this.groupService.getGroupById(+next.params['id'], url).pipe(
                map((data: Group) => {
                    if (data.my_group) {
                        return true;
                    } else {
                        this.router.navigate(['/start']);
                        return false;
                    }
                }));
        }

        if (url === 'company') {
            return this.companyService.getCompanyById(+next.params['id']).pipe(
                map((data: Company) => {
                    if (data['my_company']) {
                        return true;
                    } else {
                        this.router.navigate(['/start']);
                        return false;
                    }
                }));
        }
    }
}
