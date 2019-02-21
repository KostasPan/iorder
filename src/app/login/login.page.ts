import { LoadingService } from './../services/loading.service';
import { ToastService } from './../services/toast.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  passwordType: String = 'password';
  passwordShownIcon: String = 'eye-off';
  passwordShown = false;

  isloading: false;

  constructor(
    private toastService: ToastService,
    private authService: AuthService,
    private fb: FormBuilder,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginUser() {
    console.log(this.loginForm.value);

    this.loadingService
      .presentLoading()
      .then(() =>
        // console.log('Start LOADING');
        this.authService.loginUser(this.loginForm.value).subscribe(
          data => {
            console.log(data);
            // this.toastService.presentToast(JSON.stringify(data));
            this.toastService.presentToast(data.message);
            // this.loadingService.dismissLoading(); // ERROR!!!!
          },
          err => {
            console.log(err);
            let errorMessage: string;
            if (err.error.msg) {
              // unexpected error from server
              errorMessage = err.error.msg[0].message;
            } else if (err.error.message) {
              // controlled error from server
              errorMessage = err.error.message;
            } else {
              // machine cannot reach server
              errorMessage = 'Cannot reach server, check interconnection';
            }
            console.log('End LOADING');
            this.toastService.presentToast(errorMessage);
            // this.loadingService.dismissLoading(); // ERROR!!!!
          }
        )
      )
      .then(() => this.loadingService.dismissLoading());
  }

  togglePassword() {
    if (this.passwordShown) {
      this.passwordShown = false;
      this.passwordType = 'password';
      this.passwordShownIcon = 'eye-off';
    } else {
      this.passwordShown = true;
      this.passwordType = 'text';
      this.passwordShownIcon = 'eye';
    }
  }
}
