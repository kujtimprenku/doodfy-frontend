import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AngularMaterialModule} from './_shared/AngularMaterial.module';
import {AuthModule} from './auth/auth.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {AppComponent} from './app.component';
import {PagesModule} from './pages/pages.module';
import {EmailVerificationComponent} from './email-verification/email-verification.component';
import {JwtInterceptor} from './interceptors/JwtInterceptor';


export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
    declarations: [
        AppComponent,
        EmailVerificationComponent,
    ],
    imports: [
        BrowserModule,
        AngularMaterialModule,
        HttpClientModule,
        AuthModule,
        PagesModule,
        AppRoutingModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['http://127.0.0.1:8000'],
                blacklistedRoutes: ['http://127.0.0.1:8000/api/auth']
            }
        }),
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
