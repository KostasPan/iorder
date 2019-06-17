import { TokenService } from './token.service';
import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
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
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertChoices(
    header: string,
    subheader: string,
    message: string
  ) {
    let value;
    const alert = await this.alertController.create({
      header: header,
      subHeader: subheader,
      message: message,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            alert.dismiss(false);
          }
        },
        {
          text: 'Yes',
          handler: () => {
            alert.dismiss(true);
          }
        }
      ]
    });

    await alert.present();
    await alert.onDidDismiss().then(val => {
      value = val;
    });
    return value;
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
          cssClass: 'secondary'
        },
        {
          text: 'OK',
          handler: () => {
            this.tokenService.deleteAuthToken();
            this.tokenService.deleteAuthTokenStorage();
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
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
          }
        }
      ]
    });

    await alert.present();
  }
}
