import { OrderService } from './../../order/order.service';
import { ToastService } from './../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.scss']
})
export class CommentModalComponent implements OnInit {
  setCommentForm: FormGroup;
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    moment.locale('el');
    this.init();
  }

  init() {
    this.setCommentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });
  }

  setComment() {
    this.setCommentForm.value.time = moment().format('HH:mm:ss');
    this.orderService.sendComment(this.setCommentForm.value).subscribe(data => {
      this.toastService.presentToast(data.message);
      this.myDismiss();
    });
  }

  async myDismiss() {
    await this.modalController.dismiss();
  }
}
