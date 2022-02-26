import {Injectable} from '@angular/core';
import Pusher from 'pusher-js';
import {Comment} from '../_models/comment';
import {Observable, Subject} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    private subject: Subject<Comment> = new Subject<Comment>();
    private pusherClient: Pusher;
    username = this.authService.getUsername();

    constructor(private authService: AuthService) {

        this.pusherClient = new Pusher('d2d1198b3b73bcc1343e', {
            cluster: 'eu'
        });


        const channel = this.pusherClient.subscribe(this.username + '_notifications');
        channel.bind('friends', (data: Comment) => {
            this.subject.next(data);
        });
    }

    getFriends(): Observable<Comment> {
        return this.subject.asObservable();
    }
}
