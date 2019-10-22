import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import {AddPaymentPage} from "../add-payment-page/add-payment-page";
/**
 * Generated class for the PaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-payment-page',
  templateUrl: 'payment-page.html',
})
export class PaymentPage {
  @ViewChild('dateLabelCanvas') dateLabelCanvas;
  latestBill:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.latestBill=moment(new Date()).format('MMM YYYY');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
    this.drawLabel();
  }

  drawLabel(){
    let c1 =this.dateLabelCanvas.nativeElement;
    let ctx1 =c1.getContext('2d');

    let w = c1.width;
    let h = c1.height;

    ctx1.save();


    ctx1.beginPath();
    ctx1.moveTo(0,0);
    ctx1.lineTo((1-0.25)*w,0);

    ctx1.lineTo(w,0.5*h);
    ctx1.lineTo((1-0.25)*w,h);
    ctx1.lineTo(0,h);
    ctx1.lineTo(0,0);
    ctx1.strokeStyle="#000000";

    ctx1.fillStyle="#294f66";
    ctx1.fill();
    ctx1.font='bold 32px Helvetica';
    ctx1.textAlign='center';
    ctx1.fillStyle='#FFFFFF';
    ctx1.fillText(this.latestBill,0.4*w,0.65*c1.height);
  }

  addPayment(){
    this.navCtrl.push(AddPaymentPage);
  }
}
