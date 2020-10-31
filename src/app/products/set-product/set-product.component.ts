import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ToastService } from './../../services/toast.service';
import { ProductsService } from './../products.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-set-product',
  templateUrl: './set-product.component.html',
  styleUrls: ['./set-product.component.scss'],
})
export class SetProductComponent implements OnInit {
  public form: FormGroup;
  public detailList: FormArray;
  public detailOptionalList: FormArray;

  private detail = {
    // type: ['email', Validators.compose([Validators.required])], // i.e Email, Phone
    type: ['', Validators.compose([Validators.required])],
    choices: ['', Validators.required],
    multiple: [false],
  };

  public product = null;
  public action = null;
  private updateui = false;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private fb: FormBuilder,
    private productsService: ProductsService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.product = this.navParams.get('product');
    this.action = this.navParams.get('action');
    // console.log(this.product);
    this.init();
  }

  init() {
    this.form = this.fb.group({
      category: [
        this.product ? this.product.category : '',
        Validators.required,
      ],
      name: [this.product ? this.product.name : '', Validators.required],
      price: [
        this.product ? this.product.price : '',
        Validators.compose([Validators.min(0), Validators.required]),
      ],
      details: this.fb.array([]),
      detailsoptional: this.fb.array([]),
    });

    this.initFormArrays();

    // if there is an existing product
    if (this.product || this.action === 'edit') {
      this.initFormArrayValues();
    }
  }

  initFormArrayValues() {
    this.product.details.forEach((el) => {
      this.detailList.push(
        this.fb.group({
          type: [el.type, Validators.compose([Validators.required])],
          choices: [el.choices, Validators.required],
          multiple: [el.multiple],
        })
      );
    });
    this.product.detailsoptional.forEach((el) => {
      this.detailOptionalList.push(
        this.fb.group({
          type: [el.type, Validators.compose([Validators.required])],
          choices: [el.choices, Validators.required],
          multiple: [el.multiple],
        })
      );
    });
  }

  initFormArrays() {
    // set detaillist to this field
    this.detailList = this.form.get('details') as FormArray;
    // set detaillist to this field
    this.detailOptionalList = this.form.get('detailsoptional') as FormArray;
  }

  // returns all form groups under details
  get detailFormGroup() {
    return this.form.get('details') as FormArray;
  }
  get detailOptionalFormGroup() {
    return this.form.get('detailsoptional') as FormArray;
  }

  // detail formgroup
  createDetail(): FormGroup {
    return this.fb.group(this.detail);
  }
  createDetailOptional(): FormGroup {
    return this.fb.group(this.detail);
  }

  // add a detail form group
  addDetail() {
    this.detailList.push(this.createDetail());
  }
  addDetailOptional() {
    this.detailOptionalList.push(this.createDetailOptional());
  }

  // remove detail from group
  removeDetail(index) {
    this.detailList.removeAt(index);
  }
  removeDetailOptional(index) {
    this.detailOptionalList.removeAt(index);
  }

  // get the formgroup under details form array
  getDetailsFormGroup(index): FormGroup {
    // this.detailList = this.form.get('details') as FormArray;
    const formGroup = this.detailList.controls[index] as FormGroup;
    return formGroup;
  }
  getDetailsOptionalFormGroup(index): FormGroup {
    const formGroup = this.detailOptionalList.controls[index] as FormGroup;
    return formGroup;
  }

  modifyChoicesIfString() {
    this.form.value.details.forEach((d) => {
      if (!Array.isArray(d.choices)) {
        d.choices = d.choices.split(',');
      }
    });
    this.form.value.detailsoptional.forEach((d) => {
      if (!Array.isArray(d.choices)) {
        d.choices = d.choices.split(',');
      }
    });
  }

  // method triggered when form is submitted
  submit() {
    this.modifyChoicesIfString();
    if (this.product !== null || this.action === 'edit') {
      this.submitEditProduct();
    } else {
      this.submitNewProduct();
    }
  }

  submitEditProduct() {
    this.form.value._id = this.product._id;
    this.productsService.editProduct(this.form.value).subscribe((data) => {
      this.toastService.presentToast(data.message);
      this.updateui = true;
      this.myDismiss();
    });
  }

  submitNewProduct() {
    this.productsService.addProduct(this.form.value).subscribe((data) => {
      this.toastService.presentToast(data.message);
      this.form.reset();
      this.init();
      this.updateui = true;
      // this.init(), oxi kali praktiki,
      // den uparxei kalos tropos na sbinw
      // ta detailsList&detailsOptList [formArray] se Angular < 8
      // this.detailList.clear(); // Angular 8+
      // this.detailOptionalList.clear(); // Angular 8+
    });
  }

  async myDismiss() {
    await this.modalController.dismiss({ updateUI: this.updateui });
  }
}
