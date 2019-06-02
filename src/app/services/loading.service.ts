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
      duration: 8000
    });
    return await this.loading.present();
  }

  async dismissLoading() {
    return await this.loading.dismiss();
  }

  // async showProgressBar() {
  //   const node = document.createElement('ion-progress-bar');
  //   node.setAttribute('type', 'indeterminate');
  //   node.setAttribute('id', 'interceptor-progress-bar');
  //   document.body.appendChild(node);
  //   console.log('show Bar');
  //   return await null;
  // }
  // async hideProgressBar() {
  //   const node = document.getElementById('interceptor-progress-bar');
  //   node.parentNode.removeChild(node);
  //   console.log('hide Bar');
  //   return await null;
  // }
}
