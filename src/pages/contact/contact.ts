import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {FAQPage} from "../faq-page/faq-page";

/**
 * Generated class for the ContactPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  isenabled:boolean=false;
  feedback:any;
  showAlert:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  checkFeedback(){
    console.log('input change');
    this.showAlert=true;
    if(this.feedback.length<20){
      this.isenabled=false;

    }else{
      this.isenabled=true;
      console.log('enabled button')
    }
  }

  ionViewCanLeave(){
    if(this.showAlert){
      let alertPopup = this.alertCtrl.create({
        message:'Discard message?',
        buttons:[
          {
          text:'Cancel',
          handler:()=>{
            alertPopup.dismiss();
          }
        },{
          text:'Confirm',
          handler:()=>{
            alertPopup.dismiss().then(()=>{
              this.showAlert=false
              this.navCtrl.pop();
            });
          }
        },
         ]
      });
      alertPopup.present();
    return false;
    }
  }

  showFAQs(){
    this.showAlert=false;
     this.navCtrl.push(FAQPage);
 }

}
