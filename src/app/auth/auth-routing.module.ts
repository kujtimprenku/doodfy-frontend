import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PrivateComponent} from './register/private/private.component';
import {LoginComponent} from './login/login.component';
import {AuthComponent} from './auth.component';
import {HomeGuard} from '../_guards/home.guard';
import {RegisterComponent} from './register/register.component';
import {CompanyComponent} from './register/company/company.component';
import {NewPasswordComponent} from './new-password/new-password.component';


const routes: Routes = [
    {path: '', redirectTo: 'start', pathMatch: 'full'},
    {
        path: '', component: AuthComponent, children: [
            {path: 'login', component: LoginComponent},
            {path: 'new-password/:token', component: NewPasswordComponent},
            {
                path: 'signUp', component: RegisterComponent, children: [
                    {path: '', component: PrivateComponent},
                    {path: 'company', component: CompanyComponent},
                ]
            },
        ],
        // canActivate: [HomeGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
