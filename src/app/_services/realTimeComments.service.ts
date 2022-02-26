import Pusher from 'pusher-js';
import {Comment} from '../_models/comment';
import {Observable, Subject} from 'rxjs';


export class RealTimeCommentsService {
    private subject: Subject<Comment> = new Subject<Comment>();

    private pusherClient: Pusher;

    constructor(myChannel: string) {
        this.pusherClient = new Pusher('d2d1198b3b73bcc1343e', {cluster: 'eu'});

        const channel = this.pusherClient.subscribe(myChannel);

        channel.bind('posts', (data: Comment) => {
            this.subject.next(data);
        });
    }

    getComments(): Observable<Comment> {
        return this.subject.asObservable();
    }
}
