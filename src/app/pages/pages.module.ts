import { GroupCardComponent } from './../_shared/group-card/group-card.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagesRoutingModule} from './pages-routing.module';
import {StartComponent} from './start/start.component';
import {CreateActivityComponent} from './create-activity/create-activity.component';
import {AngularMaterialModule} from '../_shared/AngularMaterial.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivityCardComponent} from '../_shared/activity-card/activity-card.component';
import {ActivityDetailComponent} from './activity-detail/activity-detail.component';
import {BookedComponent} from './booked/booked.component';
import {HistoryComponent} from './history/history.component';
import {SavedComponent} from './saved/saved.component';
import {ExploreComponent} from './explore/explore.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {UserFriendsComponent} from './user-detail/user-friends/user-friends.component';
import {FriendCardComponent} from '../_shared/friend-card/friend-card.component';
import {UserCreatedActivitiesComponent} from './user-detail/user-created-activities/user-created-activities.component';
import {UserParticipatedActivitiesComponent} from './user-detail/user-participated-activities/user-participated-activities.component';
import {PagesComponent} from './pages.component';
import {OnLoadComponent} from '../_shared/on-load/on-load.component';
import {ImageUploadComponent} from '../_shared/image-upload/image-upload.component';
import {CompanyDetailComponent} from './company-detail/company-detail.component';
import {CompanyActivitiesComponent} from './company-detail/company-activities/company-activities.component';
import {CompanyInformationComponent} from './company-detail/company-information/company-information.component';
import {MessagesComponent} from './messages/messages.component';
import {UserEditComponent} from './account-settings/user-edit/user-edit.component';
import {ChatComponent} from './messages/chat/chat.component';
import {ProfileActivityCardComponent} from '../_shared/profile-activity-card/profile-activity-card.component';
import {ActivityExtendedCardComponent} from '../_shared/activity-extended-card/activity-extended-card.component';
import {NgxStarsModule} from 'ngx-stars';
import {ClickOutsideModule} from 'ng-click-outside';
import {UserSupportComponent} from './user-detail/user-support/user-support.component';
import {ChallengesComponent} from './challenges/challenges.component';
import {RanklistComponent} from './ranklist/ranklist.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {GeneralComponent} from './account-settings/general/general.component';
import {NotificationsComponent} from './account-settings/notifications/notifications.component';
import {ReceiptsComponent} from './account-settings/receipts/receipts.component';
import {PrivacySettingsComponent} from './account-settings/privacy-settings/privacy-settings.component';
import {ChangePasswordComponent} from './account-settings/change-password/change-password.component';
import {CompanyCardComponent} from '../_shared/company-card/company-card.component';
import {ClipboardModule} from 'ngx-clipboard';
import {ModalComponent} from '../_shared/modal/modal.component';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {MatCheckboxModule} from '@angular/material';
import { UserMedalsComponent } from './user-detail/user-medals/user-medals.component';
import { TrendingComponent } from './trending/trending.component';
import { CompanyDashboardComponent } from './company-detail/company-dashboard/company-dashboard.component';
import { CompanySubscribersComponent } from './company-detail/company-subscribers/company-subscribers.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CompanyEditComponent } from './company-detail/company-edit/company-edit.component';
import { ConfirmModalComponent } from '../_shared/confirm-modal/confirm-modal.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';
import { ClubEditComponent } from './club-detail/club-edit/club-edit.component';
import { ClubActivitiesComponent } from './club-detail/club-activities/club-activities.component';
import { CreateClubGroupComponent } from './create-club-group/create-club-group.component';
import { CreateClubComponent } from './create-club-group/create-club/create-club.component';
import { CreateGroupComponent } from './create-club-group/create-group/create-group.component';
import { ClubMembersComponent } from './club-detail/club-members/club-members.component';
import { ClubInformationComponent } from './club-detail/club-information/club-information.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupActivitiesComponent } from './group-detail/group-activities/group-activities.component';
import { GroupEditComponent } from './group-detail/group-edit/group-edit.component';
import { GroupInformationComponent } from './group-detail/group-information/group-information.component';
import { GroupMembersComponent } from './group-detail/group-members/group-members.component';
import { ManageGroupsComponent } from './manage-groups/manage-groups.component';
import { GroupsComponent } from './manage-groups/groups/groups.component';
import { ClubsComponent } from './manage-groups/clubs/clubs.component';
import {TimeAgoPipe} from '../_shared/pipes/time-ago.pipe';
import { NotificationComponent } from './notification/notification.component';
import {SafeUrlPipe} from '../_shared/pipes/safe-url.pipe';
import {PlacesComponent} from './places/places.component';
import {PlaceCardComponent} from '../_shared/place-card/place-card.component';

@NgModule({
    declarations: [
        PagesComponent,
        StartComponent,
        CreateActivityComponent,
        ActivityCardComponent,
        ActivityDetailComponent,
        BookedComponent,
        HistoryComponent,
        SavedComponent,
        ExploreComponent,
        UserDetailComponent,
        UserFriendsComponent,
        FriendCardComponent,
        UserCreatedActivitiesComponent,
        UserParticipatedActivitiesComponent,
        OnLoadComponent,
        ImageUploadComponent,
        CompanyDetailComponent,
        CompanyActivitiesComponent,
        CompanyInformationComponent,
        MessagesComponent,
        UserEditComponent,
        ChatComponent,
        ProfileActivityCardComponent,
        ActivityExtendedCardComponent,
        UserSupportComponent,
        ChallengesComponent,
        RanklistComponent,
        AccountSettingsComponent,
        GeneralComponent,
        NotificationsComponent,
        ReceiptsComponent,
        PrivacySettingsComponent,
        ChangePasswordComponent,
        CompanyCardComponent,
        ModalComponent,
        UserMedalsComponent,
        TrendingComponent,
        CompanyDashboardComponent,
        CompanySubscribersComponent,
        CompanyEditComponent,
        ConfirmModalComponent,
        ClubDetailComponent,
        ClubEditComponent,
        ClubActivitiesComponent,
        CreateClubGroupComponent,
        CreateClubComponent,
        CreateGroupComponent,
        ClubMembersComponent,
        ClubInformationComponent,
        GroupDetailComponent,
        GroupActivitiesComponent,
        GroupEditComponent,
        GroupInformationComponent,
        GroupMembersComponent,
        ManageGroupsComponent,
        GroupsComponent,
        ClubsComponent,
        GroupCardComponent,
        TimeAgoPipe,
        NotificationComponent,
        SafeUrlPipe,
        PlacesComponent,
        PlaceCardComponent,

    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        FormsModule,
        NgxStarsModule,
        ClickOutsideModule,
        ClipboardModule,
        NgxSmartModalModule.forChild(),
        MatCheckboxModule,
        InfiniteScrollModule,
        AngularEditorModule,
    ],


    entryComponents: [ModalComponent, ConfirmModalComponent]
})
export class PagesModule {
}
