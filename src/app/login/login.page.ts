import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
// import { Toast } from '@ionic-native/toast';

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

  constructor(
    private toastController: ToastController,
    // public toast: Toast,
    private authService: AuthService,
    private fb: FormBuilder
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
    this.authService.loginUser(this.loginForm.value).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
        let errorMessage: string;
        if (err.error.msg) {
          // unexpected error from server
          errorMessage = err.error.msg[0].message;
          this.presentToast(errorMessage);
          // this.presentToastNative(errorMessage);
        } else if (err.error.message) {
          // controled error from server
          errorMessage = err.error.message;
          this.presentToast(errorMessage);
          // this.presentToastNative(errorMessage);
        } else {
          // machine cannot reach server
          errorMessage = 'Cannot reach server, check interconnection';
          this.presentToast(errorMessage);
          // this.presentToastNative(errorMessage);
        }
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
      duration: 3000
    });
    toast.present();
  }

  // presentToastNative(errorMessage: string) {
  //   this.toast.show(errorMessage, '3000', 'center').subscribe(toast => {
  //     console.log(toast);
  //   });
  // }

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
