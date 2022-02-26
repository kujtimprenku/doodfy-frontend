import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {User} from '../_models/user';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Group} from '../_models/group';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    getCurrentUser(): Observable<User> {
        return this.http.get<User>(this.baseUrl + 'me');
    }

    getUserById(id: number): Observable<User> {
        return this.http.get<User>(this.baseUrl + 'user/' + id);
    }

    getEditUserInfo(): Observable<User> {
        return this.http.get<User>(this.baseUrl + 'userEdit');
    }

    getUserSubscriptions() {
        return this.http.get(this.baseUrl + 'userSubscriptions');
    }

    saveUserEdit(id: number, model: any) {
        return this.http.put(this.baseUrl + 'user/' + id, model);
    }

    getNumberOfXp() {
        return this.http.get(this.baseUrl + 'myXpPurchase');
    }


    // ========== FRIENDS REQUEST METHODS ==========

    getUserFriends(id: number): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl + 'getFriendsById/' + id);
    }

    addFriend(model: any) {
        return this.http.post(this.baseUrl + 'friendRequest', model);
    }

    unFriend(id: number) {
        return this.http.get(this.baseUrl + 'removeFriend/' + id);
    }

    getFriendRequests(model: any): Observable<User[]> {
        return this.http.post<User[]>(this.baseUrl + 'getFriendRequests', model);
    }

    acceptFriendRequest(id: number) {
        return this.http.get(this.baseUrl + 'acceptFriendRequest/' + id);
    }

    denyFriendRequest(id: number) {
        return this.http.get(this.baseUrl + 'denyFriendRequest/' + id);
    }

    cancelSendFriendRequest(id: number) {
        return this.http.get(this.baseUrl + 'cancelSendFriendRequest/' + id);
    }


    getNotifications(limit: number) {
        return this.http.get(this.baseUrl + 'notifications?limit=' + limit);
    }

    removeNotification(id: string) {
        return this.http.delete(this.baseUrl + 'removeNotification/' + id);
    }

    countUnReadNotifications() {
        return this.http.get(this.baseUrl + 'countUnReadNotifications');
    }

    makeReadNotifications() {
        return this.http.get(this.baseUrl + 'makeReadNotifications');
    }

    getInviteList(id: number): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl + 'inviteUnjoinedFriends/' + id);
    }

    // ========== RECEIPTS METHODS ==========

    getReceipts() {
        return this.http.get(this.baseUrl + 'userReceiptDates');
    }

    sendFeedback(model: any) {
        return this.http.post(this.baseUrl + 'feedback', model);
    }

}
