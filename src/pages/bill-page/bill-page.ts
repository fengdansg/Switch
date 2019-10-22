import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Data} from "../../providers/data";
import * as moment from 'moment';
/**
 * Generated class for the BillPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-bill-page',
  templateUrl: 'bill-page.html',
})
export class BillPage {

  billday:any;
  selectDate:any;
  shownDate:null;
  preDate:any;
  datelists:any;
  curtitleDate:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataService:Data) {
    this.billday = this.dataService.getbillDate(); //output a number from 1 to 31
    this.selectDate=moment().subtract(1,'month');
    this.curtitleDate = moment(this.selectDate).format('MMMM YYYY');
    this.preDate = moment().subtract(2,'month');
    this.datelists =[{ string: moment(this.selectDate).format('MMMM YYYY'),
      date:this.selectDate,},
      {
        string: moment(this.selectDate).subtract(1, 'month').format('MMMM YYYY'),
        date:moment(this.selectDate).subtract(1, 'month')
      },
      { string: moment(this.selectDate).subtract(2,'month').format('MMMM YYYY'),
        date:moment(this.selectDate).subtract(2,'month')
      },{ string: moment(this.selectDate).subtract(3,'month').format('MMMM YYYY'),
        date:moment(this.selectDate).subtract(3,'month')}];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillPage');
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

  prebillDate(date){
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

  toggleMonthBill(date){
    if(this.isBillShown(date)){
      this.shownDate=null;
    }
    else{
      this.shownDate=date;
    }
  }

  isBillShown(date){
    return this.shownDate == date;
  }

}
