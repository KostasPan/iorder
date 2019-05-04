import { LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading: any;

  constructor(private loadingController: LoadingController) {}

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      keyboardClose: true,
      duration: 6000
    });
    return await this.loading.present();
  }

  async dismissLoading() {
    return await this.loading.dismiss();
  }
}
