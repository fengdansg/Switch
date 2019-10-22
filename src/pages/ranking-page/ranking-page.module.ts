import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RankingPage } from './ranking-page';

@NgModule({
  declarations: [
   // RankingPage,
  ],
  imports: [

    IonicPageModule.forChild(RankingPage),

  ],
  exports: [
    //RankingPage
  ]
})
export class RankingPageModule {}
