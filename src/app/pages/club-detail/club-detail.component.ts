import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToastMessageService} from '../../_services/toast-message.service';
import {Title} from '@angular/platform-browser';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {Subscription} from 'rxjs';
import {Group} from '../../_models/group';
import {GroupService} from '../../_services/group.service';
import {AuthService} from '../../_services/auth.service';

class ImageSnippet {
    constructor(public src: string, public file: File) {
    }
}


@Component({
    selector: 'app-club-detail',
    templateUrl: './club-detail.component.html',
    styleUrls: ['./club-detail.component.css']
})
export class ClubDetailComponent implements OnInit {
    selectedFiles: ImageSnippet;
    uploadEnable = false;
    image: string;
    club: Group;
    currentImage: string;
    pending: boolean;
    isAuthenticated: boolean;

    constructor(private route: ActivatedRoute,
                private toastMessageService: ToastMessageService,
                private groupService: GroupService,
                private titleService: Title,
                private ngxSmartModalService: NgxSmartModalService,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.isAuthenticated = this.authService.isLoggedIn();
        this.route.data.subscribe(data => {
            this.club = data['group'];
            this.titleService.setTitle(this.club.name);
        });
    }

    processFile(imageInput: any) {
        const file = imageInput.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', (event: any) => {
            this.selectedFiles = new ImageSnippet(event.target.result, file);
            this.image = this.selectedFiles.src;
            this.uploadEnable = true;
            this.club.cover_image = this.image;
        });

        reader.readAsDataURL(file);
    }

    cancel() {
        this.club.cover_image = this.currentImage;
        this.uploadEnable = false;
    }

    changeCoverImage() {
        this.pending = true;
        const model = {
            image: this.image
        };
        this.groupService.editGroup(model, this.club.id).subscribe(response => {
            },
            error => {
                console.log(error);
            },
            () => {
                this.uploadEnable = false;
                this.pending = false;
            });
    }

    onOpenModal() {
        this.ngxSmartModalService.getModal('companyModal').open();
    }

    linkCopied() {
        this.toastMessageService.openSnackBar('Link copied', '');
    }

    getLocationHref() {
        return window.location.href;
    }

    onCloseModal() {
        this.ngxSmartModalService.getModal('companyModal').close();
    }

    onRequestToJoin() {
        const model = {
            group_id: this.club.id
        };
        this.groupService.requestMembership(model).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
        });
        this.club.membership = 0;
    }

    onLeaveClub() {
        const model = {
            group_id: this.club.id,
        };
        this.groupService.leaveGroup(model).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
        });
        this.club.membership = -1;
    }
}
