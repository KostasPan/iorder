import { IpAddressService } from './../../services/ip-address.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment as ENV } from './../../../environments/environment';
import { ToastService } from './../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ip-modal',
  templateUrl: './ip-modal.component.html',
  styleUrls: ['./ip-modal.component.scss'],
})
export class IpModalComponent implements OnInit {
  setIpAddressForm: FormGroup;
  constructor(
    private modalController: ModalController,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private IpAddressService: IpAddressService
  ) {}

  ipaddress: string;

  ngOnInit() {
    this.init();
  }

  init() {
    this.setIpAddressForm = this.formBuilder.group({
      ip: ['', Validators.required],
    });
  }

  setIpAddress() {
    this.IpAddressService.setIpAddress(this.setIpAddressForm.value.ip).then(
      () => {
        this.toastService.presentToast(
          'Server base url changed to: ' + ENV.BASEURL
        );
      }
    );
    this.myDismiss();
  }

  async myDismiss() {
    await this.modalController.dismiss();
  }
}
