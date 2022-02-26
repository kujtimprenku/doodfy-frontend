import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ElementRef, Renderer2} from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {AuthService} from '../_services/auth.service';
import {ActivityService} from '../_services/activity.service';
import {Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {Company} from '../_models/company';
import {NotificationsService} from '../_services/notifications.service';
import {Subscription} from 'rxjs';
import {Category} from '../_models/category';
import {ToastMessageService} from '../_services/toast-message.service';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {debounceTime, map, startWith} from 'rxjs/operators';
import {CategoryService} from '../_services/category.service';
import {InviteNotifications} from '../_models/invite-notifications';
import {ExploreService} from '../_services/explore.service';
import {MatBottomSheet} from '@angular/material';
import {ModalComponent} from '../_shared/modal/modal.component';
import { CompanyService } from '../_services/company.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import {GroupService} from '../_services/group.service';
import {Group} from '../_models/group';

@Component({
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnDestroy, OnInit {
    isAuthenticated: boolean;
    user: User;
    subscriptions: Company[] = [];
    favoriteCategories: Category[] = [];
    search = new FormControl(['']);

    friendRequests: User[] = [];
    friendHideBadge = false;
    inviteNotifications: InviteNotifications[] = [];
    notificationHideBadge = false;

    showLoading = true;
    mobileQuery: MediaQueryList;

    showAutocomplete = false;
    suggestedClicked = true;


    userSearched: User[] = [];
    companySearched: Company[] = [];
    categorySearched: Category[] = [];
    subcategorySearched: Category[] = [];

    unreadNotificationsNumber;

    company_id;
    role_id;

    mobileSearch;
    photoUrl: string;
    userInterests: Category[];

    clubs: Group[];
    groups: Group[];
    subscribedGroups: Group[];
    subscribedClubs: Group[];
    feedbackForm: FormGroup;

    private notificationSubscription: Subscription;

    private readonly _mobileQueryListener: () => void;

    @ViewChild('searchInput') searchInput: ElementRef;

    @ViewChild('snav') snav: any;
    toggleSidenav() {
        this.snav.toggle();
    }

    constructor(
        public changeDetectorRef: ChangeDetectorRef,
        public media: MediaMatcher,
        private router: Router,
        private activityService: ActivityService,
        private authService: AuthService,
        private _bottomSheet: MatBottomSheet,
        public userService: UserService,
        private categoryService: CategoryService,
        private exploreService: ExploreService,
        private notificationsService: NotificationsService,
        private toastMessageService: ToastMessageService,
        private renderer: Renderer2,
        private companyService: CompanyService,
        private groupService: GroupService,
        private ngxSmartModalService: NgxSmartModalService,
        private fb: FormBuilder,
        ) {

        this.router.events.subscribe((routerEvent: Event) => {
            this.checkRouterEvent(routerEvent);
        });
        this.mobileQuery = media.matchMedia('(max-width: 920px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);

        this.notificationSubscription = this.notificationsService.getFriends().subscribe(data => {
            this.friendRequests.push(data);
        });

        this.role_id = this.authService.getRoleId();
        this.company_id = +this.authService.getCompanyId();

    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    ngOnInit(): void {

        this.isAuthenticated = this.authService.isLoggedIn();

        if (this.isAuthenticated) {
            this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);

            this.currentUserInfo();
            this.userSubscriptions();

            this.categoryService.getInterests().subscribe((data: Category[]) => {
                this.favoriteCategories = data;
                this.categoryService.changeUserInterests(this.favoriteCategories);
            });

            this.userService.getNotifications(10).subscribe((data: InviteNotifications[]) => {
                this.inviteNotifications = data;
            });

            this.categoryService.currentUSerInterests.subscribe(userInterests => this.userInterests = userInterests);

            this.userService.countUnReadNotifications().subscribe((data) => {
                this.unreadNotificationsNumber = data;

                if (this.unreadNotificationsNumber === 0) {
                    this.unreadNotificationsNumber = null;
                } else {
                    this.unreadNotificationsNumber = this.unreadNotificationsNumber + '';
                }

            });

            this.getClubs();
            this.getGroups();
            this.getGroupMemberships();
            this.getClubMemberships();
        }

        this.search.valueChanges.pipe(
            startWith(''),
            debounceTime(300),
            map(value => value.length > 1 && this.suggestedClicked ? this.fillAutocomplete(this.search.value) : this.resetAutocomplete())
        ).subscribe();

        this.feedbackForm = this.fb.group({
            description: ['', [Validators.required]],
            contact_via_email: false,
        });

        setTimeout(() => this._bottomSheet.open(ModalComponent));
    }

    currentUserInfo() {
        this.userService.getCurrentUser().subscribe((user: User) => {
            this.user = user;
            this.authService.changeMemberPhoto(user.profile_image);
            this.getFriendRequests(user.id);
        }, error => console.log(error));
    }

    logout() {
        this.authService.onLogout().subscribe();
    }

    // ============== Method for showing loading bar ==============
    checkRouterEvent(routerEvent: Event): void {
        if (routerEvent instanceof NavigationStart) {
            this.showLoading = true;
        }

        if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel
            || routerEvent instanceof NavigationError) {
            this.showLoading = false;
        }
    }


    onSearch() {
        if (this.search.value == null || this.search.value === '') {
            return;
        }
        if (this.search.value.trim() !== '') {
            this.showAutocomplete = false;
            this.router.navigate(['/explore'],
                {
                    queryParams: {search: this.search.value}
                }
            );
        }
    }

    userSubscriptions() {
        this.userService.getUserSubscriptions().subscribe((data: Company[]) => {
            this.subscriptions = data;
        });
    }


    // ============== Friend Requests ==============
    getFriendRequestNumber(): string {
        const nr = this.friendRequests.length;
        if (nr === 0) {
            return null;
        }
        return nr + '';
    }

    getFriendRequests(id: number) {
        const model = {id: id};
        this.userService.getFriendRequests(model).subscribe((data: User[]) => {
            this.friendRequests = data;
        });
    }

    onAcceptFriendRequest(id: number) {
        this.userService.acceptFriendRequest(id).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
        });
        this.friendRequests = this.friendRequests.filter(friend => friend.id !== id);
    }

    onDenyFriendRequest(id: number) {
        this.userService.denyFriendRequest(id).subscribe(response => {
        });
        this.friendRequests = this.friendRequests.filter(friend => friend.id !== id);
    }

    fillAutocomplete(search: string) {
        this.showAutocomplete = true;
        this.suggestedClicked = true;
        this.exploreService.autocomplete({search: search}).subscribe(data => {
            this.userSearched = data['users'];
            this.companySearched = data['companies'];
            this.categorySearched = data['categories'];
            this.subcategorySearched = data['subcategories'];
        });
    }

    resetAutocomplete() {
        this.showAutocomplete = false;
        this.suggestedClicked = true;
        this.userSearched = [];
        this.companySearched = [];
        this.categorySearched = [];
    }

    onSuggestClick(value: string) {
        this.suggestedClicked = false;
        this.search.patchValue(value);
        this.onSearch();
    }

    readNotifications() {
        this.userService.makeReadNotifications().subscribe();
        this.unreadNotificationsNumber = null;
    }

    onFilterWithCategory(category) {
        this.router.navigate(['explore'],
            {
                queryParams: {category: category.name, cat: true}
            });
    }

    openBottomSheet(): void {
        this._bottomSheet.open(ModalComponent);
    }

    routToExplore() {
        this.router.navigate(['/explore'], {
            queryParams: {}
        });
    }

    categoryFilter(category: Category) {
        this.suggestedClicked = false;
        this.search.patchValue(category.name);
        this.router.navigate(['/explore'],
            {
                queryParams: {category: category.name, cat: true},
                queryParamsHandling: 'merge'
            });
    }

    subcategoryFilter(subcategory: Category) {
        this.suggestedClicked = false;
        this.search.patchValue(subcategory.name);
        this.router.navigate(['/explore'],
            {
                queryParams: {category: subcategory.name, cat: false},
                queryParamsHandling: 'merge'
            });
    }

    setFocusOnSearch() {
        const input = this.renderer.selectRootElement('#search');
        this.mobileSearch = !this.mobileSearch;
        setTimeout(() => input.focus(), 0);
    }

    onOpenModal() {
        this.ngxSmartModalService.getModal('feedBackModal').open();
    }
    onCloseModal() {
        this.ngxSmartModalService.getModal('feedBackModal').close();
    }

    getLocationHref() {
        return window.location.href;
    }

    onSubmitFeedback() {

        if (this.feedbackForm.valid) {
            const model = {
                ...this.feedbackForm.value,
                url: this.getLocationHref(),
            };

            this.userService.sendFeedback(model).subscribe(response => {
                this.toastMessageService.openSnackBar(response['message'], '');
            }, error => {
                console.log(error);
            }, () => {
                this.ngxSmartModalService.close('feedBackModal');
                this.feedbackForm.reset();
            });
        }
    }

    getClubs() {
        this.groupService.getMyGroups('club').subscribe(data => {
            this.clubs = data;
        });
    }

    getGroups() {
        this.groupService.getMyGroups('group').subscribe(data => {
            this.groups = data;
        });
    }
    getGroupMemberships() {
        this.groupService.getGroupMemberships('group').subscribe(data => {
            this.subscribedGroups = data;
        });
    }

    getClubMemberships() {
        this.groupService.getGroupMemberships('club').subscribe(data => {
            this.subscribedClubs = data;
        });
    }

    onNotificationNavigate(invite: InviteNotifications) {
        if (invite.activity) {
            const id = invite['activity']['id'];
            this.router.navigate(['/activity', id]);
        } else if (invite['group']['group_type'] === 'group') {
            const id = invite['group']['id'];
            this.router.navigate(['/group', id]);
        } else if (invite['group']['group_type'] === 'club') {
            const id = invite['group']['id'];
            this.router.navigate(['/club', id]);
        }
    }
}
