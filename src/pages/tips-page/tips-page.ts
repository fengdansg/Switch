import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TipsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tips-page',
  templateUrl: 'tips-page.html',
})
export class TipsPage {

  shownTip:any;
  tips:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.tips=[
      {
        name:'electricity',

      },
      {
        name:'water',

      },
      {
        name:'water',

      },
    ]

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TipsPage');
  }
  toggleTips(tipsname){
    if(this.isTipShown(tipsname)){
      this.shownTip=null;
    }
    else{
      this.shownTip=tipsname;
    }
  }

  isTipShown(tipsname){
    return this.shownTip == tipsname;
  }
}
