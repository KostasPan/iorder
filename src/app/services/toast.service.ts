import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async presentToast(errorMessage: string) {
    const toast = await this.toastController.create({
      message: errorMessage,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Close',
      // mode: 'ios',
      duration: 3000
    });
    toast.present();
  }
  async presentToastError(errorMessage: string) {
    const toast = await this.toastController.create({
      message: errorMessage,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'OK',
      // mode: 'ios',
      duration: 6000
    });
    toast.present();
  }
}
