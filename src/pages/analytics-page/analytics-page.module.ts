import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnalyticsPage } from './analytics-page';
//import {TooltipModule} from 'angular2-tooltips'
@NgModule({
  declarations: [
    //AnalyticsPage,
  ],
  imports: [

    IonicPageModule.forChild(AnalyticsPage),
  ],
  exports: [
    //AnalyticsPage
  ]
})
export class AnalyticsPageModule {}
