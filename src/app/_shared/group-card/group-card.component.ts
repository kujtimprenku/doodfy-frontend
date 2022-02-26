import {Component, OnInit, Input} from '@angular/core';
import {Group} from 'src/app/_models/group';
import {GroupService} from '../../_services/group.service';
import {ToastMessageService} from '../../_services/toast-message.service';
import {MatDialog} from '@angular/material';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';

@Component({
    selector: 'app-group-card',
    templateUrl: './group-card.component.html',
    styleUrls: ['./group-card.component.css']
})
export class GroupCardComponent implements OnInit {
    @Input()
    groups: Group[];

    constructor(private groupService: GroupService,
                private toastMessageService: ToastMessageService,
                private dialog: MatDialog) {
    }

    ngOnInit() {
    }

    onLeaveGroup(group: Group) {
        const model = {
            group_id: group.id,
        };
        this.groupService.leaveGroup(model).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
            this.groups = this.groups.filter(gr => gr.id !== model.group_id);
        });
        group.membership = -1;
    }

    deleteGroup(id: number) {
        this.groupService.deleteGroup(id).subscribe(response => {
            this.toastMessageService.openSnackBar(response['message'], 'Undo');
            this.groups = this.groups.filter(group => group.id !== id);
        });
    }

    confirmGroupDelete(id: number) {
        const dialogRef = this.dialog.open(ConfirmModalComponent, {
            data: 'Do you want to delete this?'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteGroup(id);
            }
        });
    }
}
