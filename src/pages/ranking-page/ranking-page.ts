import { Component } from '@angular/core';
import {IonicPage, NavController,  MenuController, ActionSheetController} from 'ionic-angular';
import {Data} from "../../providers/data";
import * as moment from 'moment';
import {IncentivePage} from "../incentive-page/incentive-page";

/**
 * Generated class for the RankingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ranking-page',
  templateUrl: 'ranking-page.html',


})
export class RankingPage {
  billday:any;
  selectDate:any;
  shownDate:null;
  preDate:any;
  datelists:any;
  curtitleDate:any;


  constructor(public navCtrl: NavController, public dataService:Data,public menuCtrl:MenuController,public actionSheetCtrl: ActionSheetController) {
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
    console.log('ionViewDidLoad RankingPage');
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

  toggleMonthRank(date){
  if(this.isRankShown(date)){
    this.shownDate=null;
  }
  else{
    this.shownDate=date;
  }
  }

  isRankShown(date){
   return this.shownDate == date;
  }
  openIncentive(date){
    this.navCtrl.push(IncentivePage,{
      date:date
    });
  }
  viewMenu(){
    this.menuCtrl.open();
  }

  showShareSheet(){
   let actionSheet = this.actionSheetCtrl.create({
     title:'Share your current ranking!',
     buttons:[
       {
         text:'Share to Facebook',
       },
       {
         text:'Share to Twitter',
       },
       {
         text:'Cancel',
         role:'cancel',
       }
     ]
   });
   actionSheet.present();

  }

}
