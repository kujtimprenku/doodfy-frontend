import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GroupService} from '../../../_services/group.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Group} from '../../../_models/group';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {ConfirmModalComponent} from '../../../_shared/confirm-modal/confirm-modal.component';
import {ToastMessageService} from '../../../_services/toast-message.service';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-group-edit',
    templateUrl: './group-edit.component.html',
    styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {
    editGroupForm: FormGroup;
    group: Group;
    description: string;
    pending: boolean;

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

    constructor(private fb: FormBuilder,
                private groupService: GroupService,
                private route: ActivatedRoute,
                private router: Router,
                private toastMessageService: ToastMessageService,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.editGroupForm = this.fb.group({
            name: ['', Validators.required],
            facebook_url: '',
            instagram_url: '',
            twitter_url: '',
        });

        this.groupService.getGroupById(this.route.snapshot.params['id'], 'group').subscribe(data => {
            this.group = data;
            this.description = this.group.description;
            this.fillForm(this.group);
        });
    }

    fillForm(group: Group) {
        this.editGroupForm.patchValue({
            name: group.name,
            facebook_url: group.facebook_url,
            instagram_url: group.instagram_url,
            twitter_url: group.twitter_url,
        });
    }

    onSubmit() {

        if (this.editGroupForm.valid) {
            this.pending = true;
            const model = {
                ...this.editGroupForm.value,
                description: this.description,
            };
            this.groupService.editGroup(model, this.group.id).subscribe(response => {
                this.pending = false;
            }, () => {
                this.pending = false;
            }, () => {
                this.router.navigate(['/group', this.group.id]);
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
            data: 'Do you want to delete this group?'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteGroup(id);
            }
        });
    }
}
