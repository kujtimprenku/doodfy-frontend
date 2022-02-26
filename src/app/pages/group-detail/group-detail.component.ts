import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToastMessageService} from '../../_services/toast-message.service';
import {Title} from '@angular/platform-browser';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {GroupService} from '../../_services/group.service';
import {Group} from '../../_models/group';
import {AuthService} from '../../_services/auth.service';

class ImageSnippet {
    constructor(public src: string, public file: File) {
    }
}

@Component({
    selector: 'app-group-detail',
    templateUrl: './group-detail.component.html',
    styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
    selectedFiles: ImageSnippet;
    uploadEnable = false;
    image: string;
    group: Group;
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
            this.group = data['group'];
        });
    }

    processFile(imageInput: any) {
        const file = imageInput.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', (event: any) => {
            this.selectedFiles = new ImageSnippet(event.target.result, file);
            this.image = this.selectedFiles.src;
            this.uploadEnable = true;
            this.group.cover_image = this.image;
        });

        reader.readAsDataURL(file);
    }

    cancel() {
        this.group.cover_image = this.currentImage;
        this.uploadEnable = false;
    }

    changeCoverImage() {
        this.pending = true;
        const model = {
            image: this.image
        };
        this.groupService.editGroup(model, this.group.id).subscribe(response => {
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
            group_id: this.group.id
        };
        this.groupService.requestMembership(model).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
        });
        this.group.membership = 0;
    }

    onLeaveGroup() {
        const model = {
            group_id: this.group.id,
        };
        this.groupService.leaveGroup(model).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
        });
        this.group.membership = -1;
    }
}
