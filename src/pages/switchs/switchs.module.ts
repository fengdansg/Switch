import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SwitchsPage } from './switchs';

@NgModule({
  declarations: [
   // SwitchsPage,
  ],
  imports: [
    IonicPageModule.forChild(SwitchsPage),
  ],
  exports: [
    //SwitchsPage
  ]
})
export class SwitchsPageModule {}
