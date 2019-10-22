import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPaymentPage } from './add-payment-page';

@NgModule({
  declarations: [
    //AddPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPaymentPage),
  ],
  exports: [
    //AddPaymentPage
  ]
})
export class AddPaymentPageModule {}
