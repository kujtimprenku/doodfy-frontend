import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { ToastMessageService } from 'src/app/_services/toast-message.service';
import { Title } from '@angular/platform-browser';

function verifyPassword(c: AbstractControl): { [key: string]: boolean } | null {
  const new_password = c.get('new_password');
  const confirm_password = c.get('confirm_password');

  if (new_password.pristine || confirm_password.pristine) {
    return null;
  }

  if (confirm_password.value === '') {
    return null;
  }

  if(confirm_password.value.length < 8) {
    return null;
  }

  if (new_password.value !== confirm_password.value) {
      return {'passwordMatch': true};
  }

  return null;
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  error: string;
  hide = true;
  hideNewPassword = true;

  constructor(private fb: FormBuilder, 
              private authService: AuthService, 
              private toastMessageService: ToastMessageService,
              private titleService: Title) { }

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      current_password: ["", [Validators.required]],
      new_password: ["", [Validators.required, Validators.minLength(8)]],
      confirm_password: ["", [Validators.required,Validators.minLength(8)]],
    },{validator: verifyPassword});

    this.titleService.setTitle('Change Password');
  }

  changePassword() {
    const model = {
      current_password: this.changePasswordForm.get('current_password').value,
      new_password: this.changePasswordForm.get('new_password').value,
    }

    if(this.changePasswordForm.valid) {
      this.authService.onChangePassword(model).subscribe(
        response => {
          this.toastMessageService.openSnackBar(response['message'], 'Undo');
          this.changePasswordForm.reset();
        },
        error => {
          this.error = error.error.error;
        },
        () => {
          console.log("password changed");
        }
      );
    }
  }
}
