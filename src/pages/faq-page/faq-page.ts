import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import {FeedbackPage} from "../feedback/feedback";

/**
 * Generated class for the FAQPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-faq-page',
  templateUrl: 'faq-page.html',
})
export class FAQPage {
 userInput:any;
 shouldShowCancel:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userInput=null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FAQPage');
  }
onInput(){

}
onCancel(){
  this.userInput=null;
}

}
