import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ConfirmModalComponent>,
              @Inject(MAT_DIALOG_DATA) public message: string) { }

    ngOnInit() {

    }

    onNoClick(): void {
      this.dialogRef.close();
    }
}