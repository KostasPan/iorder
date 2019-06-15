import { ToastService } from './../../services/toast.service';
import { TablesService } from './../tables.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-set-table-modal',
  templateUrl: './set-table-modal.component.html',
  styleUrls: ['./set-table-modal.component.scss']
})
export class SetTableModalComponent implements OnInit {
  setTableForm: FormGroup;
  _id;
  position_table_name = '';
  position_table = '';

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private tablesService: TablesService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this._id = this.navParams.get('_id');
    this.position_table = this.navParams.get('position_table');
    this.position_table_name = this.navParams.get('position_table_name');
    this.init();
  }

  init() {
    this.setTableForm = this.formBuilder.group({
      position_table: [
        this.position_table,
        Validators.compose([
          Validators.maxLength(4),
          Validators.minLength(1),
          Validators.required
        ])
      ],
      position_table_name: [this.position_table_name, Validators.required]
    });
  }

  setTablePos() {
    this.setTableForm.value.tableId = this._id;
    this.tablesService.editTables(this.setTableForm.value).subscribe(data => {
      this.toastService.presentToast(data.message);
      this.setTableForm.value.customized = true;
      this.myDismiss();
    });
  }

  async myDismiss() {
    await this.modalController.dismiss(this.setTableForm.value);
  }
}
