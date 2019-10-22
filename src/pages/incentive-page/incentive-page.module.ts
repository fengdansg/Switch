import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncentivePage } from './incentive-page';

@NgModule({
  declarations: [
    //IncentivePage,
  ],
  imports: [
    IonicPageModule.forChild(IncentivePage),
  ],
  exports: [
    //IncentivePage
  ]
})
export class IncentivePageModule {}
