import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchSwitchsPage } from './search-switchs';

@NgModule({
  declarations: [
    //SearchSwitchsPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchSwitchsPage),
  ],
  exports: [
    //SearchSwitchsPage
  ]
})
export class SearchSwitchsPageModule {}
