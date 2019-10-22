import { Injectable } from '@angular/core';
//import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
//import {EventEmitter} from '@angular/core';
import {Events, Platform, AlertController} from 'ionic-angular';
//import {MyApp}  from '../app/app.component'
import  {LocalNotifications} from '@ionic-native/local-notifications';
/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()

export class Data {
  //roomlists:any;
  total_consumption:any;
  schedule:any;
  emaData: any;
  billdate:any;
  emaAnalytics:any;
  analytics:any;
  allowNotice:any;
  thresholdValue:any;
  aveLineType:any;
  selectRef:any;
  mails:any;
  numNotices:any;
  numMails:any;
  notifications:any[]=[];
  showMailID:any;
  switchs:any;
  switchsGroups:any;
  switchsTypes: any;
  //totalCurEle:any;

  constructor(public alertCtrl: AlertController,public platform: Platform,public events: Events,public localnotifications:LocalNotifications) {

    console.log('Hello Data Provider');

    this.total_consumption=0;
    this.numNotices=5;
    this.numMails=5;
    //Setting Page
    this.allowNotice=false;
    this.thresholdValue=[100,100,100];
    this.aveLineType ="National Average";
    this.selectRef =0;

    // BARChart data for EMA task2
    this.emaData = {
      day:{
        eleData: [0.3, 0.2, 0.3, 0.3, 0.2, 0.3, 0.2, 0.5, 0.6, 0.3, 0.3, 0.6, 0.5, 0.4, 0.5, 0.3,0.3, 0.2, 0.5, 0.6, 0.7, 0.6, 0.5, 0.4, 0.3],
        waterData:[0.02, 0.01, 0.01, 0, 0.01, 0, 0.01, 0.04, 0.02, 0.01, 0.02, 0.02, 0.05, 0.04, 0.02,0.01, 0.02, 0.04, 0.05, 0.04, 0.04, 0.06, 0.05, 0.04,0.03],
        gasData:[0, 0, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0, 0.6, 0, 0, 0, 0, 0, 0],
        eleaverage:[],
        wateraverage:[],
        gasaverage:[],
        label:["12AM","","","","","","","","","","","","12PM","","","","","","","","","","","","12AM"],
      },
      week:{
        eleData:[9,8.2,10.1,11.3,9.7,8.6,7.6],
        waterData:[0.5,0.62,0.64,0.57,0.42,0.7,0.52],
        gasData:[5.7,6.9,7.1,5.5,6.4,5.3,5.6],
        eleaverage:[9.2, 9.1, 9.3, 9.5, 9.6, 9.4, 9.2],
        wateraverage:[0.59,0.6, 0.6,0.6,0.6,0.6,0.6],
        gasaverage:[5.1,5.1,5.1,5,4.7,5.1,5.2],
        label:[],

      },
      month:{
        eleData:[11, 10.8, 9.8, 7.9, 10.6, 8.7, 8.2, 11.3, 12.3, 7.9, 9.5, 9.2, 8.1, 10, 11.6, 9.6, 8.7, 7.9, 8.9, 9, 8.2, 10.1, 11.3, 9.7, 8.6, 7.6],
        waterData:[0.5, 0.48, 0.65,0.6, 0.54, 0.58, 0.46, 0.67, 0.74, 0.51, 0.59, 0.59, 0.76, 0.63, 0.64, 0.65, 0.61, 0.71, 0.59, 0.5, 0.62, 0.64, 0.57, 0.42, 0.7, 0.52],
        gasData:[6.3, 4.2, 5.9, 4.3, 3.2, 5.1, 7.6, 3.2, 5.1, 4.6, 4.3, 4.2, 3.8, 5.7, 5.3, 5.1, 6.3, 3.2, 4.3, 5.7, 6.9, 7.1, 5.5, 6.4, 5.3, 5.6],
        eleaverage:[9,9,9.5,9.4,9,9.1,8.9,9,9.6,9.8,9.1,9.3,9, 9.2,9.6,9.3,8.7,9.2,9.1,9.3,9.4,9.2,9.1,9.3,9.5,9.6],
        wateraverage:[0.58,0.6,0.59,0.61,0.6, 0.6,0.58,0.57,0.59,0.64,0.62,0.6,0.59, 0.59,0.6,0.61,0.6,0.62,0.61,0.6,0.62,0.59,0.6,0.6,0.6,0.6],
        gasaverage:[5.1,5.4,5,5,5.3,5.2,4.9,5.2,5.1,5,5.2,5.3,4.8,4.7,4.7,5.1,5.3,5.1,5,4.8,4.7,5.1,5.1,5.1,5,4.7],
        label:[],

      },
      year:{
        eleData:[314,307.2,300,389.4, 399,280, 314, 310, 320, 302, 308, 280, 310],
        waterData:[14.8, 15.3, 16.8, 18.3, 17.4, 15.4, 16, 17, 15, 18.4, 17.4, 14.3, 17.5],
        gasData:[180, 190, 178, 192, 180, 188, 190, 200, 180, 190, 180, 178, 192],
        eleaverage:[300,302,304,302,309,304,305,298,290,300,304,305,304],
        wateraverage:[16.4,15.4,15.3,15.8,15.9,16.5,17.5,17.4,16.8,16.7,18.5,16.9,15.9],
        gasaverage:[191,192,190,189,192,193,194,190,189,187,188,192,190],
        label:[],
      },
    };
 // Ranking Page
    this.emaAnalytics = {
      day:{
        sumele:90,
        sumwater:63,
        sumgas:78,
        maxele:100,
        maxwater:100,
        maxgas:100,
        price:6.3,
      },
      week:{
        sumele:78,
        sumwater:80,
        sumgas:68,
        maxele:100,
        maxwater:100,
        maxgas:100,
        price:40.23
      },
      month:{
        sumele:64,
        sumwater:64,
        sumgas:46,
        maxele:100,
        maxwater:100,
        maxgas:100,
        price:190.1,
      },
      year:{
        sumele:76,
        sumwater:82,
        sumgas:86,
        maxele:100,
        maxwater:100,
        maxgas:100,
        price:2130.1,
      },

    };


//Analytics page

    this.analytics ={
      day:{
        ele:{
          userAve:0.6,
          NationalAve:0.7,
          NeighbourAve:0.6,
          userPeakUsage:0.8,
          userPeakTime:'8pm',
        },
        water:{
          userAve:0.06,
          NationalAve:0.06,
          NeighbourAve:0.05,
          userPeakUsage:0.07,
          userPeakTime:'10pm',
        },
        gas:{
          userAve:0.3,
          NationalAve:0.2,
          NeighbourAve:0.4,
          userPeakUsage:0.7,
          userPeakTime:'5pm',
        }
      },

      month:{
        ele:{
          userAve:9.48,
          NationalAve:9.50,
          NeighbourAve:10.78,
          userPeakUsage:12.30,
          userPeakTime:'12/07',
        },
        water:{
          userAve:0.59,
          NationalAve:0.51,
          NeighbourAve:0.67,
          userPeakUsage:0.74,
          userPeakTime:'10/07',
        },
        gas:{
          userAve:5.16,
          NationalAve:4.89,
          NeighbourAve:5.80,
          userPeakUsage:7.60,
          userPeakTime:'10/07',
        }
      },

      year:{
        ele:{
          userAve:310.3,
          NationalAve:302.1,
          NeighbourAve:305.2,
          userPeakUsage:399.0,
          userPeakTime:'5/17',
        },
        water:{
          userAve:16.4,
          NationalAve:16.5,
          NeighbourAve:17.2,
          userPeakUsage:18.3,
          userPeakTime:'4/17',
        },
        gas:{
          userAve:186.0,
          NationalAve:190.5,
          NeighbourAve:189.2,
          userPeakUsage:200.0,
          userPeakTime:'8/16',
        }
      }

    };



    this.mails=[
      {
        id:4,
        read:false,
        date:"10 Jul 2017 10:15 am",
        content:"Water prices will increase by 30% starting from 15th July 2017.",
      },

      {
        id:3,
        read:false,
        date:"30 Jun 2017 11:15 am",
        content:"You have an overdue amount of $128.26 for your previous month bill.",
      },

      {
        id:2,
        read:false,
        date:"20 Jun 2017 10:39 am",
        content:"You have received 10% incentive for your electricity saving in 3 consecutive months.",
      },

      {
        id:1,
        read:false,
        date:"18 Jun 2017 15:15 pm",
        content:"Your June 2016 bill is ready for you to view.",
      },
      {
        id:0,
        read:false,
        date:"1 Jun 2017 13:13 pm",
        content:"You have successfully reduced your electricity usage by 10% for two consecutive months. \n \n "+
                 "Keep up the good work this month for a 10% off your next electricity bill! ",
      }

      ];
    //switchs groups
    this.switchsGroups=["Living Room", "Kitchen","Bathroom","Balcony","Master Room","Light"];
    this.switchsTypes=["Light","TV","Fridge","Aircon","Water Heater","Socket"];
    //switchs data
    this.switchs=[
      {
        name:'Ceiling Light 1',
        type: 'Light',
        status: true,
        schedule:[
          {
             time:'9:00PM',
             event:'ON',
             repeatTime:'NO',
        }],
        power:{
          realtime: 30,

          day: [32, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 0, 0, 0, 0,0, 0, 30, 30, 30, 30, 30, 30, 30],
          week: [1.3,3.2,4.3,3.2,3.2,2.3,2.3],
          month:[6.3, 4.2, 5.9, 4.3, 3.2, 5.1, 7.6, 3.2, 5.1, 4.6, 4.3, 4.2, 3.8, 5.7, 5.3, 5.1, 6.3, 3.2, 4.3, 5.7, 6.9, 7.1, 5.5, 6.4, 5.3, 5.6],
          year:[57,43.2,56,67.4, 76,59, 65, 32, 34, 23, 43, 67, 43],
        },
        group:["Living Room","Light"]
        },

      {
        name:'TV 1',
        type: 'TV',
        status: true,
        schedule:[
          {
          }],
        power:{
          realtime: 45,
          day: [32, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 0, 0, 0, 0,0, 0, 30, 30, 30, 30, 30, 30, 30],
          week: [1.3,3.2,4.3,3.2,3.2,2.3,2.3],
          month:[6.3, 4.2, 5.9, 4.3, 3.2, 5.1, 7.6, 3.2, 5.1, 4.6, 4.3, 4.2, 3.8, 5.7, 5.3, 5.1, 6.3, 3.2, 4.3, 5.7, 6.9, 7.1, 5.5, 6.4, 5.3, 5.6],
          year:[57,43.2,56,67.4, 76,59, 65, 32, 34, 23, 43, 67, 43],
        },
        group:["Living Room"]
      },

      {
        name:'Aircon 1',
        type: 'Aircon',
        status: true,
        schedule:[
          {
          }],
        power:{
          realtime: 45,
          day: [32, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 0, 0, 0, 0,0, 0, 30, 30, 30, 30, 30, 30, 30],
          week: [1.3,3.2,4.3,3.2,3.2,2.3,2.3],
          month:[6.3, 4.2, 5.9, 4.3, 3.2, 5.1, 7.6, 3.2, 5.1, 4.6, 4.3, 4.2, 3.8, 5.7, 5.3, 5.1, 6.3, 3.2, 4.3, 5.7, 6.9, 7.1, 5.5, 6.4, 5.3, 5.6],
          year:[57,43.2,56,67.4, 76,59, 65, 32, 34, 23, 43, 67, 43],
        },
        group:["Living Room"]
      },

      {
        name:'Socket 1',
        type: 'Socket',
        status: true,
        schedule:[
          {
          }],
        power:{
          realtime: 0.6,
          day: [32, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 0, 0, 0, 0,0, 0, 30, 30, 30, 30, 30, 30, 30],
          week: [1.3,3.2,4.3,3.2,3.2,2.3,2.3],
          month:[6.3, 4.2, 5.9, 4.3, 3.2, 5.1, 7.6, 3.2, 5.1, 4.6, 4.3, 4.2, 3.8, 5.7, 5.3, 5.1, 6.3, 3.2, 4.3, 5.7, 6.9, 7.1, 5.5, 6.4, 5.3, 5.6],
          year:[57,43.2,56,67.4, 76,59, 65, 32, 34, 23, 43, 67, 43],
        },
        group:["Living Room"]
      },

      {
        name:'Fridge 1',
        type: 'Fridge',
        status: true,
        schedule:[
          {
          }],
        power:{
          realtime: 41,
          day: [32, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 0, 0, 0, 0,0, 0, 30, 30, 30, 30, 30, 30, 30],
          week: [1.3,3.2,4.3,3.2,3.2,2.3,2.3],
          month:[6.3, 4.2, 5.9, 4.3, 3.2, 5.1, 7.6, 3.2, 5.1, 4.6, 4.3, 4.2, 3.8, 5.7, 5.3, 5.1, 6.3, 3.2, 4.3, 5.7, 6.9, 7.1, 5.5, 6.4, 5.3, 5.6],
          year:[57,43.2,56,67.4, 76,59, 65, 32, 34, 23, 43, 67, 43],
        },
        group:["Kitchen"]
      },

      {
        name:'Aircon 2',
        type: 'Aircon',
        status: false,
        schedule:[
          {
          }],
        power:{
          realtime: 0,
          day: [32, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 0, 0, 0, 0,0, 0, 30, 30, 30, 30, 30, 30, 30],
          week: [1.3,3.2,4.3,3.2,3.2,2.3,2.3],
          month:[6.3, 4.2, 5.9, 4.3, 3.2, 5.1, 7.6, 3.2, 5.1, 4.6, 4.3, 4.2, 3.8, 5.7, 5.3, 5.1, 6.3, 3.2, 4.3, 5.7, 6.9, 7.1, 5.5, 6.4, 5.3, 5.6],
          year:[57,43.2,56,67.4, 76,59, 65, 32, 34, 23, 43, 67, 43],
        },
        group:["Master Room"]
      },
      {
        name:'Water Heater 1',
        type: 'Water Heater',
        status: false,
        schedule:[
          {
          }],
        power:{
          realtime: 0,
          day: [32, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 0, 0, 0, 0,0, 0, 30, 30, 30, 30, 30, 30, 30],
          week: [1.3,3.2,4.3,3.2,3.2,2.3,2.3],
          month:[6.3, 4.2, 5.9, 4.3, 3.2, 5.1, 7.6, 3.2, 5.1, 4.6, 4.3, 4.2, 3.8, 5.7, 5.3, 5.1, 6.3, 3.2, 4.3, 5.7, 6.9, 7.1, 5.5, 6.4, 5.3, 5.6],
          year:[57,43.2,56,67.4, 76,59, 65, 32, 34, 23, 43, 67, 43],
        },
        group:["Bathroom"]
      },
      {
        name:'TV 2',
        type: 'TV',
        status: false,
        schedule:[
          {
          }],
        power:{
          realtime: 0,
          day: [32, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 0, 0, 0, 0,0, 0, 30, 30, 30, 30, 30, 30, 30],
          week: [1.3,3.2,4.3,3.2,3.2,2.3,2.3],
          month:[6.3, 4.2, 5.9, 4.3, 3.2, 5.1, 7.6, 3.2, 5.1, 4.6, 4.3, 4.2, 3.8, 5.7, 5.3, 5.1, 6.3, 3.2, 4.3, 5.7, 6.9, 7.1, 5.5, 6.4, 5.3, 5.6],
          year:[57,43.2,56,67.4, 76,59, 65, 32, 34, 23, 43, 67, 43],
        },
        group:["Master Room"]
      },
    ];


  }
/*setUserDetails(data:Object):void{
    let newData = JSON.stringify(data);
    this.storage.set('userdetails',newData)
}*/
/*getRoomLists(){
    console.log("output roomlists");
    console.log(this.total_consumption);
    return this.roomlists

}*/

/*getSwitchLists(RoomID){
  for (let i of this.roomlists){
    if(i.id ==RoomID){
      console.log(i.id);
      return i.switchlists

    }
    else{
      console.debug("no such room name")
    }
  }
}*/
getemaData(){
  return this.emaData;
}

getbillDate(){
  return this.billdate;
}
getemaAnalytics(){
  return this.emaAnalytics;
}

getAnalytics(){
  return this.analytics;
}


getNumNotices():any{
  this.numNotices=0;
  for(let i of this.mails){
    if(i.read){

    }
    else{
      this.numNotices=this.numNotices+1;
    }
  }
  return this.numNotices;
}
setLabel(curDate):void{
  this.billdate = 1;
this.emaData.week.label = [moment(curDate).subtract(6, 'days').format("D/M"),"","",moment(curDate).subtract(3, 'days').format("D/M"),"","",moment(curDate).format("D/M") ];

if ( moment(curDate).date()<=this.billdate){
  this.emaData.month.label = [moment(curDate).date(this.billdate).subtract(1, 'months').format("D/M"),"","","","","","","",moment(curDate).date(this.billdate).subtract(1, 'months').add(8,'days').format("D/M"),"","","","","","","",moment(curDate).date(this.billdate).subtract(1, 'months').add(16,'days').format("D/M"),"","","","","","","",moment(curDate).date(this.billdate).subtract(1, 'months').add(24,'days').format("D/M"),"","","","","","",""]
}
else{
  this.emaData.month.label = [moment(curDate).date(this.billdate).format("D/M"),"","","","","","","",moment(curDate).date(this.billdate).add(8,'days').format("D/M"),"","","","","","","",moment(curDate).date(this.billdate).add(16,'days').format("D/M"),"","","","","","","",moment(curDate).date(this.billdate).add(24,'days').format("D/M"),"","","","","","",""]

}

this.emaData.year.label = [ moment(curDate).subtract(1,'years').format("M/YY"),"","","","","",moment(curDate).subtract(6,'months').format("M/YY"),"","","","","",moment(curDate).format("M/YY")];

}

getLabel(curDate,timePeriod){
  switch (timePeriod){
    case 'day':{
      return ["12AM","","","","","","","","","","","","12PM","","","","","","","","","","","","12AM"];
    }
    case 'week':{
      return [moment(curDate).subtract(6, 'days').format("D/M"),"","",moment(curDate).subtract(3, 'days').format("D/M"),"","",moment(curDate).format("D/M") ];
    }
    case 'month':{
      if ( moment(curDate).date()<=this.billdate){
        return [moment(curDate).date(this.billdate).subtract(1, 'months').format("D/M"),"","","","","","","",moment(curDate).date(this.billdate).subtract(1, 'months').add(8,'days').format("D/M"),"","","","","","","",moment(curDate).date(this.billdate).subtract(1, 'months').add(16,'days').format("D/M"),"","","","","","","",moment(curDate).date(this.billdate).subtract(1, 'months').add(24,'days').format("D/M"),"","","","","","",""]
      }
      else{
        return [moment(curDate).date(this.billdate).format("D/M"),"","","","","","","",moment(curDate).date(this.billdate).add(8,'days').format("D/M"),"","","","","","","",moment(curDate).date(this.billdate).add(16,'days').format("D/M"),"","","","","","","",moment(curDate).date(this.billdate).add(24,'days').format("D/M"),"","","","","","",""]

      }
    }
    case 'year':{
      return [ moment(curDate).subtract(1,'years').format("M/YY"),"","","","","",moment(curDate).subtract(6,'months').format("M/YY"),"","","","","",moment(curDate).format("M/YY")];

    }
  }
}

getSetting(){
  return {
    allowNotice:this.allowNotice,
    threshold:this.thresholdValue,
    lineType:this.aveLineType,
    refIndex:this.selectRef,
  }
}

  addNotifications(id,utility,unit){
    this.numNotices++;
    this.events.publish('numNotices:changed',this.numNotices);
    let notification = {
      id: this.numMails,
      title: 'Switch',
      text: 'You have exceeded your monthly threshold usage for '+utility+'by 60 '+unit,
    };
    let noticeMail={

      id:this.numMails,
      read:false,
      date:moment().format('DD MMM YYYY h:mm a'),
      content:'You have exceeded your monthly threshold usage for '+utility+'by 60 '+unit,

    };
    this.numMails++;
    this.notifications.push(notification);
    this.mails.unshift(noticeMail);
    console.log("Notifications to be scheduled: ", this.notifications);



  if(this.platform.is('cordova')){
    console.log('Notifications to be showed' );
    this.localnotifications.schedule(this.notifications);
    console.log("received: ", this.notifications);
    this.notifications=[];
    let alert = this.alertCtrl.create({
      title: 'Notifications set'+utility,
      buttons: ['Ok']
    });

    alert.present();
  }

  }
setSetting(allowNotice,threshold,lineType,refindex){
    this.allowNotice=allowNotice;
    this.thresholdValue=threshold;
    this.aveLineType=lineType;
    this.selectRef = refindex;


    if(this.allowNotice){
      if(this.emaAnalytics.month.sumele>this.thresholdValue[0]){
        console.log('data.ts:electricity warning');
        this.addNotifications(1,'electricity','kWh');
      }
      if(this.emaAnalytics.month.sumwater>this.thresholdValue[1]){
        console.log('data.ts:water warning');
        this.addNotifications(2,'water','CuM');
      }

      if(this.emaAnalytics.month.sumgas>this.thresholdValue[2]){
        console.log('data.ts: gas warning');
        this.addNotifications(3,'gas','kWh');
      }
    }


//listen to the change event of the aveLineType
  this.events.publish('aveLineType:changed',this.aveLineType);
}




getNotification(){
  return this.mails;
}

searchSwitchs(searchTerm){
  return this.switchs.filter((sw)=>{
    return sw.name.toLowerCase().indexOf(searchTerm.toLowerCase())>-1;
  });
}
setReadNotification(mailID){
  for(let i of this.mails) {
    if (i.id == mailID) {
      i.read = true;
    }
  }
  this.numNotices=0;

  for(let i of this.mails){
    if(i.read){

    }
    else{
      this.numNotices=this.numNotices+1;
      console.log("data.ts numNotices:"+this.numNotices);
    }
  }
//listen to the change event of the numNotices
  this.events.publish('numNotices:changed',this.numNotices);

}


setshowMailID(mailID){
  this.showMailID = mailID;
  console.log("set the shownMail ID:" +mailID);
}

getshowMailID(){

  console.log("get the shownMail ID:" +this.showMailID);
  return this.showMailID;

}

getCurrentTotal(){
  var totalHourConsumption =0;
  for(let sw of this.switchs){
   // totalHourConsumption+=sw.power.realtime
  }
 console.log('data.ts: totalHourly Consuption: '+totalHourConsumption)
  return totalHourConsumption;
}
/*
setSwitchStatus(switchID,roomID,status):void{

  for (let i of this.roomlists){
    if(i.id == roomID){
     for (let j of i.switchlists){
       if(j.id == switchID){
         j.status = status;
         if (j.status == false){
           //setting the color to grey if the switch is off
           j.color = "#a1a1a1";
           j.label = 'Off';
         }
         else if (j.status == true){
           //setting the color back to original color if it switch on
           j.color = j.settingColor;
           j.label = 'On';
         }
         console.log("data.ts "+i.name+" "+j.name+" "+j.status)
       }
     }
    }
  }
}
*/

 /* setAlertStatus(switchID,roomID,status):void{

    for (let i of this.roomlists){
      if(i.id == roomID){
        for (let j of i.switchlists){
          if(j.id == switchID){
            j.alertwindow = status;
/!*            if (j.alertwindow  == false){
              //setting the color to grey if the switch is off
              //j.color = "#a1a1a1";
              j.label = 'Off';
            }
            else if (j.alertwindow  == true){
              //setting the color back to original color if it switch on
             // j.color = j.settingColor;
              j.label = 'On';
            }*!/
            console.log("data.ts "+i.name+" "+j.name+" "+j.alertwindow )
          }
        }
      }
    }
  }*/


}
