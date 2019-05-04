import { TokenService } from './../../services/token.service';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { ToastService } from './../../services/toast.service';
import { LoadingService } from './../../services/loading.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

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
    private loadingService: LoadingService,
    private router: Router,
    private tokenService: TokenService
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
      .then(() => {
        this.authService.loginUser(this.loginForm.value).subscribe(
          data => {
            console.log(data);
            this.loginForm.reset();
            this.tokenService.setAuthToken(data.token);
            // this.toastService.presentToast(JSON.stringify(data));
            this.router.navigate(['tables']);
            // this.loadingService.dismissLoading(); // ERROR!!!!
          },
          err => {
            console.log(err);
            let errorMessage: string;
            if (err.error.msg) {
              // unexpected joi error from server
              errorMessage = err.error.msg[0].message;
            } else if (err.error.message) {
              // controlled error from server
              errorMessage = err.error.message;
            } else {
              // machine cannot reach server
              errorMessage = 'Cannot reach server, check interconnection';
            }
            this.toastService.presentToastError(errorMessage);
            // this.loadingService.dismissLoading(); // ERROR!!!!
          }
        );
      })
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
