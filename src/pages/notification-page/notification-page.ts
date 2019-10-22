import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Data} from "../../providers/data";

/**
 * Generated class for the NotificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-notification-page',
  templateUrl: 'notification-page.html',
})
export class NotificationPage {

  shownMail:any;
  mails:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService:Data) {
/*  this.mails=[
    {
      id:1,
      read:false,
      date:"10 Jul 2017 10:15 am",
      content:" Water prices will increase by 30% start from 15th July 2017.",
    }

  ];*/

   this.mails = dataService.getNotification();
   this.shownMail = dataService.getshowMailID();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

  toggleMail(mailID){

    for(let i of this.mails){
      if(i.id==mailID){

        this.dataService.setshowMailID(mailID);
        if(i.read){

        }else{
          i.read=true;
          this.dataService.setReadNotification(mailID);

        }
      }
    };
    if(this.isMailShown(mailID)){
      this.shownMail=null;
    }
    else{
      this.shownMail=mailID;
    }
  }

  isMailShown(mailID){
    return this.shownMail == mailID;

  }

}
