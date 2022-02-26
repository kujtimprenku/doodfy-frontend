import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, take, tap} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '../_models/user';
import {Router} from '@angular/router';
import {Observable, pipe, BehaviorSubject, ReplaySubject} from 'rxjs';
import {environment} from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    baseUrl = environment.apiUrl;
    jwtHelper = new JwtHelperService();

    emailConfirm = {
        message: 'We have sent an email confirmation',
        show: false
    };

    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isUserAuthenticated = this.isAuthenticatedSubject.asObservable();

    photoUrl = new BehaviorSubject<string>('../../assets/images/profile_img.png');
    currentPhotoUrl = this.photoUrl.asObservable();

    constructor(
        private http: HttpClient,
        private router: Router) {
    }

    changeMemberPhoto(photoUrl: string) {
        this.photoUrl.next(photoUrl);
    }

    authEmailVerification(token: String) {
        return this.http.get(this.baseUrl + 'auth/activation/' + token);
    }

    authForgotPassword(email: any) {
        return this.http.post(this.baseUrl + 'auth/forgotPassword', email);
    }

    authNewPassword(token: String, password: any) {
        return this.http.post(this.baseUrl + 'auth/newPassword/' + token, password);
    }

    checkEmailAvailable(email: any) {
        return this.http.post(this.baseUrl + 'auth/emailCheck', email);
    }

    onChangePassword(model: any) {
        return this.http.post(this.baseUrl + 'auth/changePassword', model);
    }


    onRegister(model: any) {
        return this.http.post(this.baseUrl + 'auth/register', model)
            .pipe(
                map(response => {
                    // Receive jwt token in the response
                    const token: string = response['token'];
                    // If we have a token, proceed
                    if (token) {
                        this.setToken(token);
                        this.setRoleId(response['user']['role_id']);
                        this.setUsername(response['user']['username']);
                        this.isAuthenticatedSubject.next(true);
                    }
                    return response;
                })
            );
    }

    onLogin(model: any): Observable<User> {
        return this.http.post(this.baseUrl + 'auth/login', model).pipe(
            map((response: User) => {
                const token: string = response['token'];
                if (token) {
                    this.setToken(token);
                    this.setRoleId(response['user']['role_id']);
                    this.setUsername(response['user']['username']);
                    this.isAuthenticatedSubject.next(true);
                }
                return response;
            })
        );
    }

    onLogout() {
        return this.http.get(this.baseUrl + 'logout').pipe(
            tap(
                () => {
                    this.removeToken();
                    this.removeRoleId();
                    this.removeUsername();
                    this.removeCompanyId();
                    this.isAuthenticatedSubject.next(false);
                    this.router.navigate(['/login']);
                }
            )
        );
    }

    getInitialInfo() {
        return this.http.get(this.baseUrl + 'initialInfo');
    }

    onCompanyRegister(model: any) {
        return this.http.post(this.baseUrl + 'auth/registerCompany', model).pipe(
            map(response => {
                // Receive jwt token in the response
                const token: string = response['token'];
                // If we have a token, proceed
                if (token) {
                    this.setToken(token);
                    this.setRoleId(response['user']['role_id']);
                    this.setCompanyId(response['user']['company_id']);
                    this.isAuthenticatedSubject.next(true);
                }
                return response;
            })
        );
    }

    onClubRegister(model: any) {
        return this.http.post(this.baseUrl + 'auth/registerClub', model).pipe(
            map(response => {
                // Receive jwt token in the response
                const token: string = response['token'];
                // If we have a token, proceed
                if (token) {
                    this.setToken(token);
                }
                return response;
            })
        );
    }

    setToken(token: string): void {
        return localStorage.setItem('token', token);
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    removeToken() {
        return localStorage.removeItem('token');
    }

    setRoleId(role_id: string): void {
        return localStorage.setItem('r', role_id);
    }

    getRoleId(): string {
        return localStorage.getItem('r');
    }

    removeRoleId() {
        return localStorage.removeItem('r');
    }

    setUsername(username: string): void {
        return localStorage.setItem('u', username);
    }

    getUsername(): string {
        return localStorage.getItem('u');
    }

    removeUsername() {
        return localStorage.removeItem('u');
    }


    setCompanyId(company_id: string): void {
        return localStorage.setItem('c', company_id);
    }

    getCompanyId(): string {
        return localStorage.getItem('c');
    }

    removeCompanyId() {
        return localStorage.removeItem('c');
    }

    isAuthenticated(): boolean {
        const token: string = this.getToken();
        return !this.jwtHelper.isTokenExpired(token);
    }

    setAuth() {
        const token: string = this.getToken();
        if (token) {
            this.isAuthenticatedSubject.next(true);
        }
    }

    isLoggedIn() {
        return this.isAuthenticatedSubject.value;
    }
}
