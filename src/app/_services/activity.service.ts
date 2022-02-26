import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Activity} from '../_models/activity';
import {Comment} from '../_models/comment';
import {environment} from '../../environments/environment';
import {Group} from '../_models/group';
import {Place} from '../_models/place';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {
    baseUrl = environment.apiUrl;

    typeOfActivity = new BehaviorSubject<Group>(null);
    currentTypeOfActivity = this.typeOfActivity.asObservable();
    typeOfPlaceActivity = new BehaviorSubject<Place>(null);
    currentTypeOfPlaceActivity = this.typeOfPlaceActivity.asObservable();

    constructor(private http: HttpClient) {
    }

    getActivities(): Observable<Activity[]> {
        return this.http.get<Activity[]>(this.baseUrl + 'activities');
    }

    getActivityByCityId(id: number): Observable<Activity[]> {
        return this.http.get<Activity[]>(this.baseUrl + 'activityByCity/' + id);
    }

    // =============== CURRENT USER ===============

    getCurrentUserActivities(): Observable<Activity[]> {
        return this.http.get<Activity[]>(this.baseUrl + 'userCreatedActivities');
    }

    getCurrentUserHistoryActivities(): Observable<Activity[]> {
        return this.http.get<Activity[]>(this.baseUrl + 'userHistories');
    }

    addActivityToHistory(model: any) {
        return this.http.post(this.baseUrl + 'userHistories', model);
    }

    deleteActivityHistory() {
        return this.http.delete(this.baseUrl + 'userHistories');
    }

    getCurrentUserJoinedActivities(): Observable<Activity[]> {
        return this.http.get<Activity[]>(this.baseUrl + 'bookedActivities');
    }

    getStartRecommendedActivities(): Observable<Activity[]> {
        return this.http.get<Activity[]>(this.baseUrl + 'startRecommendedActivities');
    }

    getCurrentUserSavedActivities(): Observable<Activity[]> {
        return this.http.get<Activity[]>(this.baseUrl + 'saveActivity');
    }

    getActivityComments(id: number): Observable<Comment[]> {
        return this.http.get<Comment[]>(this.baseUrl + 'activityComments/' + id);
    }

    addActivityComment(model: any) {
        return this.http.post(this.baseUrl + 'activityComment', model);
    }

    deleteActivityComment(id: number) {
        return this.http.delete(this.baseUrl + 'activityComment/' + id);
    }


    // =============== OTHER USERS ===============

    getActivitiesHistoryByUserId(id: number): Observable<Activity[]> {
        return this.http.get<Activity[]>(this.baseUrl + 'activitiesHistoryByUser/' + id);
    }

    getActivitiesByUserId(id: number): Observable<Activity[]> {
        return this.http.get<Activity[]>(this.baseUrl + 'user/' + id + '/activities');
    }


    // =============== OTHER ===============

    getActivityByID(id: number): Observable<Activity> {
        return this.http.get<Activity>(this.baseUrl + 'activity/' + id);
    }

    saveActivity(model: any) {
        return this.http.post(this.baseUrl + 'saveActivity', model);
    }

    unSaveActivity(id: number) {
        return this.http.delete(this.baseUrl + 'saveActivity/' + id);
    }

    joinActivity(model: any) {
        return this.http.post(this.baseUrl + 'joinActivity', model);
    }

    unJoinActivity(id: number) {
        return this.http.delete(this.baseUrl + 'unJoinActivity/' + id);
    }

    createActivity(model: any) {
        return this.http.post(this.baseUrl + 'activity', model);
    }

    deleteActivity(id: number) {
        return this.http.delete(this.baseUrl + 'activity/' + id);
    }

    deleteAllActivityOccurrences(id: number) {
        return this.http.delete(this.baseUrl + 'destroyAll/' + id);
    }

    activityEditInfo(id: number) {
        return this.http.get(this.baseUrl + 'activityEdit/' + id);
    }

    onUpdateActivity(model: any, id: number) {
        return this.http.put(this.baseUrl + 'activity/' + id, model);
    }

    inviteFriendToActivity(model: any) {
        return this.http.post(this.baseUrl + 'inviteFriendToActivity', model);
    }

    inviteAllFriendsToActivity(id: number) {
        return this.http.get(this.baseUrl + 'inviteAllFriendsToActivity/' + id);
    }

    getTrendingMostViewedActivities(): Observable<Activity[]> {
        return this.http.get<Activity[]>(this.baseUrl + 'mostViewedActivities');
    }

    getTrendingMostJoinedActivities(): Observable<Activity[]> {
        return this.http.get<Activity[]>(this.baseUrl + 'mostJoinedActivities');
    }

    duplicateActivity(id: number) {
        return this.http.get<Activity[]>(this.baseUrl + 'replicateActivity/' + id);
    }

    activityGalllery(model: any) {
        return this.http.post(this.baseUrl + 'activityGallery', model);
    }

    getActivityImages(id: number, size: string): Observable<any> {
        return this.http.get<any>(this.baseUrl + 'activity/' + id + '/gallery/' + size);
    }

    deleteActivityImage(activity_id: number, image_id: number) {
        return this.http.delete(this.baseUrl + 'activity/' + activity_id + '/gallery/' + image_id);
    }

    occurrencesActivity(parent_id: number) {
        return this.http.get<Activity[]>(this.baseUrl + 'activity/' + parent_id + '/occurrences');
    }
}
