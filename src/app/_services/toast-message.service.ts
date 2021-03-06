import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class ToastMessageService {

    constructor(private snackBar: MatSnackBar) {
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2500,
        });
    }
}
