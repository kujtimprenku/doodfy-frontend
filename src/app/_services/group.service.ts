import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {User} from '../_models/user';
import {Group} from '../_models/group';
import {Activity} from '../_models/activity';

@Injectable({
    providedIn: 'root'
})
export class GroupService {
    baseUrl = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private router: Router) {}

    onCreateGroup(model: any) {
        return this.http.post(this.baseUrl + 'group', model);
    }

    getMyGroups(type: string): Observable<Group[]> {
        return this.http.get<Group[]>(this.baseUrl + 'myGroups/' + type);
    }

    getGroupById(id: number, type: string): Observable<Group> {
        return this.http.get<Group>(this.baseUrl + 'group/' + id + '/' + type);
    }

    getMembers(id: number): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl + 'acceptedMemberships/' + id);
    }

    getRequestedMembers(id: number): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl + 'pendingMemberships/' + id);
    }

    editGroup(model: any, id: number) {
        return this.http.put(this.baseUrl + 'group/' + id, model);
    }

    getInviteFriendsGroupList(id: number): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl + 'inviteFriendsGroup/' + id);
    }

    inviteFriendToGroup(model) {
        return this.http.post(this.baseUrl + 'sendInvite', model);
    }

    deleteGroup(id: number) {
        return this.http.delete(this.baseUrl + 'group/' + id);
    }

    // ========== Group Activities ==========

    getGroupActivities(id: number): Observable<Activity[]> {
        return this.http.get<Activity[]>(this.baseUrl + 'group/' + id + '/activities');
    }

    getGroupMemberships(type: string): Observable<Group[]> {
        return this.http.get<Group[]>(this.baseUrl + 'userMemberships/' + type);
    }

    // ========== MEMBERS REQUEST METHODS ==========

    requestMembership(model: any) {
        return this.http.post(this.baseUrl + 'requestMembership', model);
    }

    acceptMembershipRequest(model: any) {
        return this.http.post(this.baseUrl + 'acceptMembershipRequest', model);
    }

    cancelMembership(model: any) {
        return this.http.post(this.baseUrl + 'cancelMembership', model);
    }

    leaveGroup(model: any) {
        return this.http.post(this.baseUrl + 'leaveMembership', model);
    }

}
