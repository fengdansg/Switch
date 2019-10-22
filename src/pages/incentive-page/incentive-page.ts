import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Data} from "../../providers/data";
import * as moment from 'moment';
/**
 * Generated class for the IncentivePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-incentive-page',
  templateUrl: 'incentive-page.html',
})
export class IncentivePage {

  selectDate:any;
  curTitleDate:any;
  billday:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public dataService:Data) {
    this.selectDate=this.navParams.get('date');
    this.billday = this.dataService.getbillDate();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IncentivePage');
  }

  billDate(date){
    var billdate;
    if (date==null){
      //default to today
      if (this.billday>=moment().date()){
        billdate =moment().set('date',this.billday).subtract(1,'months');
      }
      else{
        billdate = moment().set('date',this.billday);
      }
    }
    else{
      billdate = moment(date).set('date',this.billday);
    }
    return moment(billdate).format('DD MMM YYYY');
  }

  preBillDate(date){
    var billdate;
    if (date==null){
      //default to today
      if (this.billday>=moment().date()){
        billdate =moment().set('date',this.billday).subtract(2,'months');
      }
      else{
        billdate = moment().set('date',this.billday).subtract(1,'months');
      }
    }
    else{
      billdate = moment(date).set('date',this.billday).subtract(1,'months');
    }
    return moment(billdate).format('DD MMM YYYY');
  }

}
