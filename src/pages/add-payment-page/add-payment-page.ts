import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddPaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-payment-page',
  templateUrl: 'add-payment-page.html',
})
export class AddPaymentPage {

  paymentTypes:any;
  selectType:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.paymentTypes= [
      {
        title: "Credit Card",
        check: false,
      },
      {
        title: "eNets",
        check: false,
      },
      {
        title:   "PayPal",
        check: false,
      },
      {
        title:   "Apple Pay",
        check: false,
      },
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPaymentPage');
  }

  updateSelection(pt){
    for(let i of this.paymentTypes){
      if(i.title==pt.title){
        i.check=true;

        this.selectType=i.title;
        //this.dataService.setSetting(this.allowNotice,this.thresholdValue,this.selectLineType,this.selectRefIndex);
        console.log('update PaymentTypes: '+this.selectType);
      }
      else{
        i.check=false;
      }
    }
  }
}
