import { DetailsComponent } from './../details-component/details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [DetailsComponent],
  exports: [DetailsComponent, CommonModule],
  imports: [CommonModule, FormsModule, IonicModule]
})
export class DetailsShareModule {}
