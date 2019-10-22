import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FAQPage } from './faq-page';

@NgModule({
  declarations: [
    //FAQPage,
  ],
  imports: [
    IonicPageModule.forChild(FAQPage),
  ],
  exports: [
    //FAQPage
  ]
})
export class FAQPageModule {}
