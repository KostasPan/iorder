import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

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

}
