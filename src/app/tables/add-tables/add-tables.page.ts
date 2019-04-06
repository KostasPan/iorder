import { TablesService } from './../tables.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-add-tables',
  templateUrl: './add-tables.page.html',
  styleUrls: ['./add-tables.page.scss']
})
export class AddTablesPage implements OnInit {
  addTablesForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private router: Router,
    private formBuilder: FormBuilder,
    private tablesService: TablesService,
    private toastService: ToastService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.addTablesForm = this.formBuilder.group({
      positionName: ['', Validators.required],
      tablesNumber: [
        '',
        Validators.compose([Validators.required, Validators.min(1)])
      ]
    });
  }

  addTables() {
    this.loadingService
      .presentLoading()
      .then(() => {
        this.tablesService.addTable(this.addTablesForm.value).subscribe(
          data => {
            console.log(data);
            this.addTablesForm.reset();
            this.toastService.presentToast(data.message);
          },
          err => {
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

  closeAddTablesPage() {
    this.router.navigate(['/tables']);
  }

  closeAddTablesModal() {
    this.modalController.dismiss();
  }
}
