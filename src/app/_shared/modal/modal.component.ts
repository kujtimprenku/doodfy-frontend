import {Component, OnInit} from '@angular/core';
import { MatBottomSheet } from '@angular/material';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

    constructor(private _bottomSheet: MatBottomSheet) {
    }

    ngOnInit(): void {
    }

    onCloseModal() {
        this._bottomSheet.dismiss();
    }

}
