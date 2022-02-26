import {
    Component,
    OnDestroy,
    OnInit,
    ElementRef,
    ViewChild,
    AfterViewInit,
    AfterViewChecked,
    ChangeDetectorRef,
    ViewChildren, QueryList
} from '@angular/core';
import {ActivityService} from '../../_services/activity.service';
import {Activity} from '../../_models/activity';
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../_models/user';
import {Comment} from '../../_models/comment';
import {UserService} from '../../_services/user.service';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs';
import {RealTimeCommentsService} from '../../_services/realTimeComments.service';
import {ToastMessageService} from '../../_services/toast-message.service';
import {CategoryService} from '../../_services/category.service';
import {XpService} from '../../_services/xp.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import { MatDialog } from '@angular/material';
import { ConfirmModalComponent } from 'src/app/_shared/confirm-modal/confirm-modal.component';
import { Title } from '@angular/platform-browser';
import {AuthService} from '../../_services/auth.service';

@Component({
    templateUrl: './activity-detail.component.html',
    styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
    activity: Activity;
    currentUser: User;
    pending = false;
    myFriends: User[] = [];

    commentForm: FormGroup;
    comments: Comment[] = [];
    buttonText: string;
    buttonColor: string;
    buttonDisable: boolean;
    urls = [];
    images = [];
    largeImages: [];
    galleryPending = false;
    savePending = false;
    urlsIndex = this.urls.length;
    uploadedNewImages: boolean;

    disableGiveXpToAllButton: boolean;
    seeMore: boolean;
    descriptionHeight: number;
    activityLocation: string;
    repeatedActivities: Activity[];
    showAllGalleryImages: boolean;
    @ViewChild('description') description: ElementRef;
    @ViewChildren('target') attendeeInputs: QueryList<ElementRef>;


    private messageService: RealTimeCommentsService;
    isLoading: boolean;
    parent_id;
    isAuthenticated: boolean;

    get realTimeComments() {
        return this.comments;
    }

    private commentSubscription: Subscription;

    constructor(private activityService: ActivityService,
                private location: Location,
                private route: ActivatedRoute,
                private router: Router,
                private ngxSmartModalService: NgxSmartModalService,
                private fb: FormBuilder,
                private xpService: XpService,
                private toastMessageService: ToastMessageService,
                private categoryService: CategoryService,
                private userService: UserService,
                private dialog: MatDialog,
                private titleService: Title,
                private cdRef: ChangeDetectorRef,
                private authService: AuthService) {
    }

    ngOnInit() {

        this.isAuthenticated = this.authService.isLoggedIn();
        this.route.data.subscribe(data => {
            this.titleService.setTitle(data['activity']['title']);
            this.activity = data['activity'];
            this.activityLocation = 'https://www.google.com/maps/embed/v1/place?q=' +
                this.activity.location.replace(' ' , '+') + '&key=AIzaSyBY2OQcVFWjyo41pvknqgwlpI3-e8X5NOo';
            this.disableGiveXpToAllButton = this.activity.users.filter(x => x.given_xp === false).map(x => x.id).length === 0;

            this.buttonDisable = false;
            if (this.activity.has_joined) {
                this.buttonText = 'Unjoin';
                this.buttonColor = '#ABAFB1';
            }

            if (!this.activity.has_joined) {
                this.buttonText = 'Join';
                this.buttonColor = '#E5125E';
            }

            if (this.activity.nr_joined === this.activity.max_persons && !this.activity.has_joined) {
                this.buttonText = 'No spots left';
                this.buttonDisable = true;
            }

            if (!this.activity.is_active) {
                this.buttonText = 'Activity finished';
                this.buttonDisable = true;
            }
            this.comments = this.activity.comments;
        });

        this.commentForm = this.fb.group({
            comment: [null, [Validators.required]]
        });

        if (this.isAuthenticated) {
            this.currentUserInfo();
            this.addActivityToHistory(this.activity.id);

        } else {
            this.commentForm.get('comment').disable();
        }

        this.messageService = new RealTimeCommentsService(this.activity.id + '_comments');
        this.commentSubscription = this.messageService.getComments().subscribe(comment => {
            if (this.currentUser.id !== comment[0].user.id) {
                comment[0].my_comment = false;
            }
            this.comments.unshift(comment[0]);
        });

        this.getActivityImages();
    }

    ngAfterViewInit() {
        this.descriptionHeight = this.description.nativeElement.offsetHeight;
    }

    ngAfterViewChecked() {
        this.descriptionHeight = this.description.nativeElement.offsetHeight;
        this.cdRef.detectChanges();
    }

    ngOnDestroy() {
        this.commentSubscription.unsubscribe();
    }

    onSubmit() {
        const model = {
            id: this.route.snapshot.params['id'],
            comment: this.commentForm.get('comment').value
        };
        if (this.commentForm.get('comment').valid) {
            this.activityService.addActivityComment(model).subscribe(
                response => console.log(response),
                error => console.log(error)
            );
            this.commentForm.reset();
        }
    }

    deleteActivity(id: number) {
        this.activityService.deleteActivity(id).subscribe(() => {
            this.toastMessageService.openSnackBar('Successfully deleted', 'Undo');
            this.router.navigate(['/' + this.currentUser.id]);
        });

    }


    deleteComment(id: number) {
        this.activityService.deleteActivityComment(id).subscribe((response) => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
        });

        this.comments = this.comments.filter(comment => comment.id !== id);
    }

    onJoinActivity(activityId: number) {
        const model = {
            id: activityId
        };
        this.activityService.joinActivity(model).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
        }, error => {
            console.log(error);
        });

        this.buttonText = 'Unjoin';
        this.buttonColor = '#ABAFB1';

        this.activity.nr_joined += 1;
        this.activity.has_joined = true;

        const userJoined = {
            id: this.currentUser.id,
            username: this.currentUser.username,
            profile_image: this.currentUser.profile_image
        };

        this.activity.users.unshift(userJoined);
    }


    onUnJoinActivity(id: number) {
        this.activityService.unJoinActivity(id).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
        }, error => {
            console.log(error);
        });

        this.buttonText = 'Join';
        this.buttonColor = '#E5125E';

        this.activity.nr_joined -= 1;
        this.activity.has_joined = false;

        this.activity.users = this.activity.users.filter(user => user.id !== this.currentUser.id);
    }

    currentUserInfo() {
        this.userService.getCurrentUser().subscribe((user: User) => {
            this.currentUser = user;
            if (this.currentUser.xp_points === 0) {
                this.disableGiveXpToAllButton = true;
            }
        }, error => console.log(error));
    }

    addActivityToHistory(id: number) {
        const model = {
            activity_id: id,
        };
        this.activityService.addActivityToHistory(model).subscribe();
    }

    onAddCategoryToFavorites(id: number) {
        this.categoryService.addCategoryToInterests(id).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
        }, error => {
            this.toastMessageService.openSnackBar('Error occurred', 'Undo');
        }, () => {
            this.activity.category.find(x => x.id === id).has_favorite = true;
        });
    }

    onRemoveCategoryFromFavorites(id: number) {
        this.categoryService.removeCategoryFromInterests(id).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
        }, error => {
            this.toastMessageService.openSnackBar('Error occurred', 'Undo');
        }, () => {
            this.activity.category.find(x => x.id === id).has_favorite = false;
        });
    }

    onGiveXp(user_id: number, activity_id: number, subcategory_id: number) {
        this.xpService.giveXpToUser({user_id: user_id, activity_id: activity_id, subcategory_id: subcategory_id}).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
        });
        this.activity.users.find(x => x.id === user_id).given_xp = true;
        this.disableGiveXpToAllButton = this.activity.users.filter(x => x.given_xp === false).map(x => x.id).length === 0;
        this.currentUser.xp_points--;
    }

    onGiveAllXp(activity_id: number, users: User[]) {
        const model = {
            activity_id: activity_id,
            users_id: users.filter(x => x.given_xp === false).map(x => x.id)
        };

        this.xpService.giveXpToAll(model).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
        });
        this.activity.users.map(x => x.given_xp = true);
        this.disableGiveXpToAllButton = true;
        this.currentUser.xp_points = this.currentUser.xp_points - model.users_id.length;
    }

    onInviteAllFriends(id: number) {
        this.activityService.inviteAllFriendsToActivity(id).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
        });

        this.ngxSmartModalService.getModal('myModal').close();
    }

    onInviteSpecificFriend(activity_id: number, recipient_id: number) {
        this.activityService.inviteFriendToActivity({activity_id: activity_id, friend_id: recipient_id}).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
        });

        this.myFriends.find(x => x.id === recipient_id)['invited'] = true;
    }

    getLocationHref() {
        return window.location.href;
    }

    linkCopied() {
        this.toastMessageService.openSnackBar('Link copied', '');
    }

    onOpenModal() {
        this.ngxSmartModalService.getModal('myModal').open();
    }

    onOpenRepetitiveModal(id: number) {
        this.parent_id = id;
        this.isLoading = true;
        this.ngxSmartModalService.getModal('repeatedActivtites').open();
        this.activityService.occurrencesActivity(id).subscribe(response => {
            this.repeatedActivities = response;
            this.isLoading = false;
        });
    }

    onOpenFriendsModal() {
        this.pending = true;

        if (this.myFriends.length === 0) {
            this.userService.getInviteList(this.activity.id).subscribe((data: User[]) => {
                this.myFriends = data;
                this.myFriends.map(obj => {
                    obj['invited'] = false;
                });
                this.pending = false;
            });
        }

        this.ngxSmartModalService.getModal('myModal').close();
        this.ngxSmartModalService.getModal('inviteFriendsModal').open();
    }

    onOpenXpModal() {
        this.ngxSmartModalService.getModal('xpModal').open();
    }

    onCloseModal() {
        this.ngxSmartModalService.getModal('myModal').close();
        this.ngxSmartModalService.getModal('xpModal').close();
        this.ngxSmartModalService.getModal('inviteFriendsModal').close();
        this.ngxSmartModalService.getModal(('galleryModal')).close();
    }

    onFilterWithCategory(category) {
        this.router.navigate(['explore'],
            {
                queryParams: {category: category.name, cat: true}
            });
    }

    duplicateActivity(id: number) {
        let activity_id;
        this.activityService.duplicateActivity(id).subscribe(response => {
            activity_id = response['id'];
        }, error => console.log(error),
        () => {
            this.router.navigate(['/activity', activity_id, 'edit' ]);
        });
    }

    onSaveActivity(activity: Activity) {
        const model = {
            id: activity.id
        };
        this.activityService.saveActivity(model).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
        }, error => {
            console.log(error);
        });
        this.activity.has_saved = true;
    }


    onUnSaveActivity(id: number) {
        this.activityService.unSaveActivity(id).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
        }, error => {
            console.log(error);
        });
        this.activity.has_saved = false;
    }

    confirmActivityDelete(id: number) {
        const dialogRef = this.dialog.open(ConfirmModalComponent, {
            data: 'Do you want to delete this activity?'
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.deleteActivity(id);
            }
          });
    }

    onSelectFile(event) {
        if (event.target.files && event.target.files[0]) {
            const filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
                const reader = new FileReader();
                reader.onload = (result: any) => {
                    this.urls.push(result.target.result);
                };
                reader.readAsDataURL(event.target.files[i]);
            }
        }
    }
    onOpenGalleryModal(id: number) {
        this.ngxSmartModalService.getModal('galleryModal').open();
        if (!this.largeImages) {
            this.getActivityGalleryLargeImages(id);
        }  else if (this.uploadedNewImages) {
            this.getActivityGalleryLargeImages(id);
        } else {
            this.scrollToGalleryImage(id);
        }
        this.uploadedNewImages = false;
    }

    scrollToGalleryImage(id: number) {
        setTimeout(() => {
            this.attendeeInputs.toArray()[id].nativeElement.scrollIntoView();
        }, 0);
    }

    getActivityGalleryLargeImages(id) {
        this.activityService.getActivityImages(this.activity.id, 'large').subscribe(data => {
                this.largeImages = data;
            }, error => {console.log(error); },

            () => {
                this.scrollToGalleryImage(id);
            });
    }
    onSaveImages() {
        this.savePending = true;
        this.uploadedNewImages = true;
        const model = {
            activity_id: this.activity.id,
            images: this.urls
        };
        this.activityService.activityGalllery(model).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
            this.urlsIndex = this.urls.length;
            this.savePending = false;
        });
    }
    getActivityImages() {
        this.activityService.getActivityImages(this.activity.id, 'thumbnail').subscribe(response => {
            this.images = response;
            this.galleryPending = true;
        });
    }

    onDeleteImage(img: any) {
        this.activityService.deleteActivityImage(this.activity.id, img.id).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
        }, error => console.log(error));
        this.images = this.images.filter(image => image.id !== img.id);
    }

    onDeleteUploadedImage(id: number) {
        this.urls.splice(id, 1);
    }
}
