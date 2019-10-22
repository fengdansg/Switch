import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SwitchAnalyticPage } from './switch-analytic';

@NgModule({
  declarations: [
    //SwitchAnalyticPage,
  ],
  imports: [
    IonicPageModule.forChild(SwitchAnalyticPage),
  ],
  exports: [
   // SwitchAnalyticPage
  ]
})
export class SwitchAnalyticPageModule {}
