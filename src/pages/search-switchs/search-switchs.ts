import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormControl} from "@angular/forms";
import {Data} from "../../providers/data";
import {Searchbar} from 'ionic-angular';

/**
 * Generated class for the SearchSwitchsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search-switchs',
  templateUrl: 'search-switchs.html',
})
export class SearchSwitchsPage {
  searchTerm: string ='';
  searchControl:FormControl;
  switchiteams:any;
  @ViewChild(Searchbar) searchbar:Searchbar;
  showList:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService:Data) {
   this.searchControl = new FormControl();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchSwitchsPage');

     this.searchSwitchsName();
     this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
       this.searchSwitchsName();

     });

  }

  ionViewDidEnter(){
    setTimeout(() => {
      this.searchbar.setFocus();
    });
  }

  searchSwitchsName(){
   this.switchiteams=this.dataService.searchSwitchs(this.searchTerm);

   }

  onCancel(){
    this.navCtrl.pop({animate:false});
  }
}
