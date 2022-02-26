import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MessagesService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    getLastChatWith() {
        return this.http.get(this.baseUrl + 'lastFriendMessage');
    }

    friendMessage(id: number) {
        return this.http.get(this.baseUrl + 'friendMessage/' + id);
    }

    sendMessage(model: any) {
        return this.http.post(this.baseUrl + 'message', model);
    }
}
