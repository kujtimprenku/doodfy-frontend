import {NgModule} from '@angular/core';
import { ClubsComponent } from './manage-groups/clubs/clubs.component';
import { GroupsComponent } from './manage-groups/groups/groups.component';
import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from './pages.component';
import {AuthGuard} from '../_guards/auth.guard';
import {StartComponent} from './start/start.component';
import {CreateActivityComponent} from './create-activity/create-activity.component';
import {ActivityDetailComponent} from './activity-detail/activity-detail.component';
import {BookedComponent} from './booked/booked.component';
import {HistoryComponent} from './history/history.component';
import {SavedComponent} from './saved/saved.component';
import {ExploreComponent} from './explore/explore.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {UserDetailResolver} from '../_resolvers/user/user-detail.resolver';
import {ActivityDetailResolver} from '../_resolvers/pages/activity-detail.resolver';
import {UserFriendsComponent} from './user-detail/user-friends/user-friends.component';
import {UserActivitiesResolver} from '../_resolvers/user/user-activities.resolver';
import {UserFriendsResolver} from '../_resolvers/user/user-friends.resolver';
import {UserHistoryActivitiesResolver} from '../_resolvers/user/user-history-activities.resolver';
import {UserCreatedActivitiesComponent} from './user-detail/user-created-activities/user-created-activities.component';
import {UserParticipatedActivitiesComponent} from './user-detail/user-participated-activities/user-participated-activities.component';
import {SavedActivitiesResolver} from '../_resolvers/pages/saved-activities.resolver';
import {BookedActivitiesResolver} from '../_resolvers/pages/booked-activities.resolver';
import {ExploreResolver} from '../_resolvers/pages/explore.resolver';
import {CompanyDetailComponent} from './company-detail/company-detail.component';
import {CompanyActivitiesComponent} from './company-detail/company-activities/company-activities.component';
import {CompanyInformationComponent} from './company-detail/company-information/company-information.component';
import {CompanyDetailResolver} from '../_resolvers/company/company-detail.resolver';
import {CompanyActivitiesResolver} from '../_resolvers/company/company-activities.resolver';
import {MessagesComponent} from './messages/messages.component';
import {UserEditComponent} from './account-settings/user-edit/user-edit.component';
import {HistoryActivitiesResolver} from '../_resolvers/pages/history-activities.resolver';
import {ChatComponent} from './messages/chat/chat.component';
import {MessagesResolver} from '../_resolvers/pages/messages.resolver';
import {UserSupportComponent} from './user-detail/user-support/user-support.component';
import {ChallengesComponent} from './challenges/challenges.component';
import {RanklistComponent} from './ranklist/ranklist.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {GeneralComponent} from './account-settings/general/general.component';
import {ReceiptsComponent} from './account-settings/receipts/receipts.component';
import {PrivacySettingsComponent} from './account-settings/privacy-settings/privacy-settings.component';
import {NotificationsComponent} from './account-settings/notifications/notifications.component';
import {ChangePasswordComponent} from './account-settings/change-password/change-password.component';
import { UserMedalsComponent } from './user-detail/user-medals/user-medals.component';
import { TrendingComponent } from './trending/trending.component';
import { CompanyDashboardComponent } from './company-detail/company-dashboard/company-dashboard.component';
import { CompanySubscribersComponent } from './company-detail/company-subscribers/company-subscribers.component';
import { CompanyEditComponent } from './company-detail/company-edit/company-edit.component';
import { CreateClubGroupComponent } from './create-club-group/create-club-group.component';
import { EditActivityGuard } from '../_guards/edit-activity.guard';
import { CreateClubComponent } from './create-club-group/create-club/create-club.component';
import { CreateGroupComponent } from './create-club-group/create-group/create-group.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';
import { ClubActivitiesComponent } from './club-detail/club-activities/club-activities.component';
import { ClubMembersComponent } from './club-detail/club-members/club-members.component';
import { ClubInformationComponent } from './club-detail/club-information/club-information.component';
import { ClubEditComponent } from './club-detail/club-edit/club-edit.component';
import {GroupDetailComponent} from './group-detail/group-detail.component';
import {GroupActivitiesComponent} from './group-detail/group-activities/group-activities.component';
import {GroupMembersComponent} from './group-detail/group-members/group-members.component';
import {GroupInformationComponent} from './group-detail/group-information/group-information.component';
import {GroupEditComponent} from './group-detail/group-edit/group-edit.component';
import {GroupDetailResolver} from '../_resolvers/groups/group-detail.resolver';
import {CanEditGuard} from '../_guards/can-edit.guard';
import { ManageGroupsComponent } from './manage-groups/manage-groups.component';
import {NotificationComponent} from './notification/notification.component';
import {PlacesComponent} from './places/places.component';


const routes: Routes = [
    {
        path: '', component: PagesComponent, runGuardsAndResolvers: 'always',
        children: [
            {path: 'start', component: StartComponent},
            {
                path: 'account', component: AccountSettingsComponent, children: [
                    {path: '', component: GeneralComponent},
                    {path: 'edit-profile', component: UserEditComponent},
                    {path: 'notification', component: NotificationsComponent},
                    {path: 'receipts', component: ReceiptsComponent},
                    {path: 'privacy-settings', component: PrivacySettingsComponent},
                    {path: 'password', component: ChangePasswordComponent},
                ], canActivate: [AuthGuard],
            },
            {path: 'challenges', component: ChallengesComponent, canActivate: [AuthGuard]},
            {path: 'ranklist', component: RanklistComponent, canActivate: [AuthGuard]},
            {
                path: 'explore',
                component: ExploreComponent,
                resolve: {explore: ExploreResolver},
                runGuardsAndResolvers: 'paramsOrQueryParamsChange'
            },
            {path: 'place/:id', component: PlacesComponent},
            {
                path: 'company/:id', component: CompanyDetailComponent,
                resolve: {company: CompanyDetailResolver},
                children: [
                    {path: '', component: CompanyActivitiesComponent, resolve: {companyActivities: CompanyActivitiesResolver}},
                    {path: 'info', component: CompanyInformationComponent, resolve: {company: CompanyDetailResolver}}
                ]
            },
            {path: 'subscribers/:id', component: CompanySubscribersComponent},
            {path: 'company/:id/edit', component: CompanyEditComponent, canActivate: [CanEditGuard, AuthGuard]},
            {path: 'dashboard', component: CompanyDashboardComponent, canActivate: [AuthGuard]},
            {path: 'trending', component: TrendingComponent},
            {path: 'booked', component: BookedComponent, resolve: {bookedActivities: BookedActivitiesResolver}, canActivate: [AuthGuard]},
            {path: 'history', component: HistoryComponent,
                resolve: {historyActivities: HistoryActivitiesResolver},
                canActivate: [AuthGuard]
            },
            {
                path: 'messages', component: MessagesComponent, children: [
                    {path: 'friend/:id', component: ChatComponent, resolve: {messages: MessagesResolver}}
                ], canActivate: [AuthGuard]
            },
            {path: 'club/:id', component: ClubDetailComponent,
                resolve: {group: GroupDetailResolver},
                children: [
                {path: '', component: ClubActivitiesComponent},
                {path: 'members', component: ClubMembersComponent},
                {path: 'info', component: ClubInformationComponent},

            ]},
            {path: 'club/:id/edit', component: ClubEditComponent, canActivate: [CanEditGuard, AuthGuard]},

            {path: 'group/:id', component: GroupDetailComponent,
                resolve: {group: GroupDetailResolver},
                children: [
                    {path: '', component: GroupActivitiesComponent},
                    {path: 'members', component: GroupMembersComponent},
                    {path: 'info', component: GroupInformationComponent},

                ]},
            {path: 'group/:id/edit', component: GroupEditComponent, canActivate: [CanEditGuard, AuthGuard]},

            {path: 'create-club-group', component: CreateClubGroupComponent, children: [
                {path: '', component: CreateClubComponent},
                {path: 'group', component: CreateGroupComponent}
            ], canActivate: [AuthGuard]},
            {
                path: 'manage', component: ManageGroupsComponent,
                children: [
                    { path: '', component: GroupsComponent },
                    { path: 'clubs', component: ClubsComponent }
                ], canActivate: [AuthGuard]
            },
            {path: 'saved', component: SavedComponent, resolve: {savedActivities: SavedActivitiesResolver}, canActivate: [AuthGuard]},
            {path: 'create-activity', component: CreateActivityComponent, canActivate: [AuthGuard]},
            {path: 'notifications', component: NotificationComponent, canActivate: [AuthGuard] },
            {
                path: ':id', component: UserDetailComponent,
                resolve: {user: UserDetailResolver},
                children: [
                    {
                        path: '',
                        component: UserParticipatedActivitiesComponent,
                        resolve: {userHistoryActivities: UserHistoryActivitiesResolver}
                    },
                    {
                        path: 'created', component: UserCreatedActivitiesComponent,
                        resolve: {userActivities: UserActivitiesResolver}
                    },
                    {path: 'friends', component: UserFriendsComponent, resolve: {userFriends: UserFriendsResolver}},
                    {path: 'support', component: UserSupportComponent},
                    {path: 'medals', component: UserMedalsComponent},
                ]
            },
            {
                path: 'activity/:id', component: ActivityDetailComponent,
                resolve: {activity: ActivityDetailResolver}
            },
            {path: 'activity/:id/edit',
                component: CreateActivityComponent,
                canActivate: [CanEditGuard],
                canDeactivate: [EditActivityGuard]
            },
        ],
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {
}
