import { NgModule } from '@angular/core';
import {  IonicPageModule } from 'ionic-angular';
import { MonitorBar } from './monitor-bar';

@NgModule({
  declarations: [
   // MonitorBar,
  ],
  imports: [
    IonicPageModule.forChild(MonitorBar),
  ],
  exports: [
    //MonitorBar
  ]
})
export class MonitorBarModule {}
