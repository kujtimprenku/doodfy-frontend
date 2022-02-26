import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Company} from '../../_models/company';
import {CompanyService} from '../../_services/company.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {ToastMessageService} from '../../_services/toast-message.service';
import { Title } from '@angular/platform-browser';
import { NgxSmartModalService } from 'ngx-smart-modal';
import {AuthService} from '../../_services/auth.service';

class ImageSnippet {
    constructor(public src: string, public file: File) {
    }
}

@Component({
    selector: 'app-company-detail',
    templateUrl: './company-detail.component.html',
    styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

    selectedFiles: ImageSnippet;
    uploadEnable = false;
    image: string;
    company: Company;
    currentImage: string;
    myCompany: boolean;
    pending: boolean;
    isAuthenticated: boolean;

    constructor(private route: ActivatedRoute,
                private companyService: CompanyService,
                private toastMessageService: ToastMessageService,
                private titleService: Title,
                private ngxSmartModalService: NgxSmartModalService,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.isAuthenticated = this.authService.isLoggedIn();

        this.route.data.subscribe(data => {
            this.company = data['company'];
            this.titleService.setTitle(this.company.firm);
        });
        this.currentImage = this.company.cover_image;
        this.myCompany = this.company['my_company'];
    }

    onSubscribe(id: number) {
        this.companyService.subscribeCompany(id).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'undo');
        }, error => {
            console.log(error);
        }, () => {
            this.company.nr_subscribers += 1;
            this.company.has_subscribed = true;
        });
    }

    onUnSubscribe(id: number) {
        this.companyService.unSubscribeCompany(id).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'undo');
        }, error => {
            console.log(error);
        }, () => {
            this.company.nr_subscribers -= 1;
            this.company.has_subscribed = false;
        });
    }

    processFile(imageInput: any) {
        const file = imageInput.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', (event: any) => {
            this.selectedFiles = new ImageSnippet(event.target.result, file);
            this.image = this.selectedFiles.src;
            this.uploadEnable = true;
            this.company.cover_image = this.image;
        });

        reader.readAsDataURL(file);
    }
    cancel() {
        this.company.cover_image = this.currentImage;
        this.uploadEnable = false;
    }

    changeCoverImage() {
        this.pending = true;
        const model = {
            image: this.image
        };
        this.companyService.editCompany(model, this.company.id).subscribe(response => {
            console.log(response);
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

}
