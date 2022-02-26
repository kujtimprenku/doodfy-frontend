import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GroupService} from '../../../_services/group.service';

@Component({
    selector: 'app-create-group',
    templateUrl: './create-group.component.html',
    styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
    groupForm: FormGroup;

    constructor(private fb: FormBuilder,
                private groupService: GroupService,
                private router: Router) {
    }

    ngOnInit() {
        this.groupForm = this.fb.group({
            name: ['', [Validators.required]],
        });
    }

    onSubmit() {
        if (this.groupForm.valid) {
            const model = {...this.groupForm.value, group_type: 'group'};
            let id;
            this.groupService.onCreateGroup(model).subscribe(
                response => {
                    id = response['id'];
                    console.log(id);
                },
                error => {
                    console.log(error);
                },
                () => this.router.navigate(['/group', id])
            );
        }
    }
}
