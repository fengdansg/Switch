import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentPage } from './payment-page';

@NgModule({
  declarations: [
    //PaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentPage),
  ],
  exports: [
    //PaymentPage
  ]
})
export class PaymentPageModule {}
