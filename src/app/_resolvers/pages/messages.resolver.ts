import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Message} from '../../_models/message';
import {MessagesService} from '../../_services/messages.service';

@Injectable({
    providedIn: 'root'
})
export class MessagesResolver implements Resolve<Message> {
    constructor(private messagesService: MessagesService, private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Message> {
        return this.messagesService.friendMessage(route.params['id']).pipe(
            catchError(error => {
                console.log('Error while retrieving messages');
                this.router.navigate(['/start']);
                return of(null);
            })
        );
    }
}
