import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmailVerificationComponent} from './email-verification/email-verification.component';

const routes: Routes = [
    {path: 'emailVerification/:id', component: EmailVerificationComponent},
    {path: '**', redirectTo: 'login', pathMatch: 'full'},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
