import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {PrivateComponent} from './register/private/private.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';
import {AngularMaterialModule} from '../_shared/AngularMaterial.module';
import {AuthGuard} from '../_guards/auth.guard';
import {CompanyComponent} from './register/company/company.component';
import {RegisterComponent} from './register/register.component';
import {AuthComponent} from './auth.component';
import {NewPasswordComponent} from './new-password/new-password.component';
import { ClubComponent } from './register/club/club.component';

@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        RegisterComponent,
        PrivateComponent,
        CompanyComponent,
        NewPasswordComponent,
        ClubComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AngularMaterialModule,
    ],
    providers: [AuthGuard]
})
export class AuthModule {
}
