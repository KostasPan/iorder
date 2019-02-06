import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

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

  loading: any;

  constructor(
    private toastController: ToastController,
    private authService: AuthService,
    private fb: FormBuilder,
    private loadingController: LoadingController
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
    this.presentLoading();
    console.log('Start LOADING');
    this.authService.loginUser(this.loginForm.value).subscribe(
      data => {
        console.log(data);
        this.presentToast(JSON.stringify(data));
        this.dismissLoading(); //ERROR!!!!
      },
      err => {
        console.log(err);
        let errorMessage: string;
        if (err.error.msg) {
          // unexpected error from server
          errorMessage = err.error.msg[0].message;
        } else if (err.error.message) {
          // controled error from server
          errorMessage = err.error.message;
        } else {
          // machine cannot reach server
          errorMessage = 'Cannot reach server, check interconnection';
        }
        console.log('End LOADING');
        this.presentToast(errorMessage);
        this.dismissLoading(); //ERROR!!!!
      }
    );
  }

  async presentToast(errorMessage: string) {
    const toast = await this.toastController.create({
      message: errorMessage,
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Close',
      mode: 'ios',
      duration: 4000
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      keyboardClose: true
    });
    return await this.loading.present();
  }
  async dismissLoading() {
    return await this.loading.dismiss();
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
