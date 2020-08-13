import { ModalController } from '@ionic/angular';
import { IpModalComponent } from './../ip-modal/ip-modal.component';
import { environment as ENV } from './../../../environments/environment';
import { TokenService } from './../../services/token.service';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { ToastService } from './../../services/toast.service';
import { LoadingService } from './../../services/loading.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  passwordType: String = 'password';
  passwordShownIcon: String = 'eye-off';
  passwordShown = false;

  constructor(
    private toastService: ToastService,
    private authService: AuthService,
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private router: Router,
    private tokenService: TokenService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginUser() {
    console.log(this.loginForm.value);

    this.loadingService
      .presentLoading()
      .then(() => {
        this.authService.loginUser(this.loginForm.value).subscribe(
          (data) => {
            console.log(data);
            this.loginForm.reset();
            this.tokenService.setAuthToken(data.token);
            this.tokenService
              .setAuthTokenStorage(data.token)
              .then(() => this.router.navigate(['/tables']));
            // this.router
            //   .navigate(['tables'])
            //   .then(() =>
            //     this.loginForm['controls']['password'].setValue('00000000')
            //   );
          },
          (err) => {
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

  async openIPModal() {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: IpModalComponent,
      cssClass: 'details-modal-css-50',
    });
    // modal.onDidDismiss().then((detail: OverlayEventDetail) => {
    //   if (detail.data) {
    //     if (detail.data.updateUI === true) {
    //       this.getAllProducts();
    //     }
    //   }
    // });
    await modal.present();
  }
}
