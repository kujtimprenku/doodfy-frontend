import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {Group} from '../../../_models/group';
import {GroupService} from '../../../_services/group.service';
import {ConfirmModalComponent} from '../../../_shared/confirm-modal/confirm-modal.component';
import {ToastMessageService} from '../../../_services/toast-message.service';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-club-edit',
    templateUrl: './club-edit.component.html',
    styleUrls: ['./club-edit.component.css']
})
export class ClubEditComponent implements OnInit {

    config: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: '15rem',
        minHeight: '5rem',
        placeholder: 'Enter text here...',
        translate: 'no',
        toolbarPosition: 'top',
        defaultFontName: 'Times New Roman',
    };

    description: string;
    club: Group;
    editForm: FormGroup;
    pending: boolean;

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private groupService: GroupService,
                private toastMessageService: ToastMessageService,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.editForm = this.fb.group({
            name: '',
            facebook_url: '',
            instagram_url: '',
            twitter_url: '',
        });
        this.groupService.getGroupById(this.route.snapshot.params['id'], 'club').subscribe(data => {
            this.club = data;
            this.fillForm(this.club);
        });
    }

    fillForm(club: Group) {
        this.editForm.patchValue({
            name: club.name,
            facebook_url: club.facebook_url,
            instagram_url: club.instagram_url,
            twitter_url: club.twitter_url,
        });
        this.description = club.description;
    }

    saveClubEdit() {
        if (this.editForm.valid) {
            this.pending = true;
            const model = {
                ...this.editForm.value,
                description: this.description,
            };
            this.groupService.editGroup(model, this.club.id).subscribe(response => {
                this.pending = false;
            }, () => {
                this.pending = false;
            }, () => {
                this.router.navigate(['/club', this.club.id]);
            });
        }
    }

    deleteGroup(id: number) {
        this.groupService.deleteGroup(id).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
            this.router.navigate(['/start']);
        });
    }

    confirmGroupDelete(id: number) {
        const dialogRef = this.dialog.open(ConfirmModalComponent, {
            data: 'Do you want to delete this club?'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteGroup(id);
            }
        });
    }
}
