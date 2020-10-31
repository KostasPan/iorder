import { TokenService } from './token.service';
import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    private alertController: AlertController,
    private router: Router,
    private tokenService: TokenService
  ) {}

  async presentAlert(header: string, subheader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subheader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlertChoices(
    header: string,
    subheader: string,
    message: string
  ) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subheader,
      message: message,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          // handler: () => {
          //   alert.dismiss(false);
          // },
        },
        {
          text: 'Yes',
          role: 'confirm',
        },
      ],
    });

    await alert.present();
    return await alert.onDidDismiss().then((val) => {
      if (val.role === 'confirm') {
        val.data = true;
      }
      return val;
    });
  }

  // TODO: confirm logout alert
  async presentAlertConfirmLogout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'OK',
          role: 'OK',
          handler: () => {
            this.tokenService.deleteAuthToken();
            this.tokenService.deleteAuthTokenStorage();
            this.router.navigate(['/login']);
          },
        },
      ],
    });

    await alert.present();
    return await alert.onDidDismiss().then(() => {
      return false;
    });
  }

  async presentAlertDeathLogout(message: string) {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: message,
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.tokenService.deleteAuthToken();
            this.router.navigate(['/login']);
          },
        },
      ],
    });

    await alert.present();
  }
}
