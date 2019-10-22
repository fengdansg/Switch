import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Data} from "../../providers/data";

/**
 * Generated class for the SettingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-setting-page',
  templateUrl: 'setting-page.html',
})
export class SettingPage {
  linetypes:any;
  reference:any;
  selectLineType:any;
  selectRef:any;
  refValue:any;
  selectRefIndex:any;
  thresholdValue:any[];
  allowNotice:any;
  settings:any;
  elethresholdValue:any;
  waterthresholdValue:any;
  gasthresholdValue:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataService:Data) {
    this.settings = dataService.getSetting();
    this.selectRefIndex=this.settings.refIndex;
    this.thresholdValue=this.settings.threshold;
    this.allowNotice=this.settings.allowNotice;
    this.selectLineType = this.settings.lineType;
    this.elethresholdValue = this.thresholdValue[0];
    this.waterthresholdValue = this.thresholdValue[1];
    this.gasthresholdValue = this.thresholdValue[2];
    console.log('Settings: selectRefIndex: '+this.selectRefIndex);
    console.log('LineType: '+this.selectLineType);
    console.log('allowNotice: '+this.allowNotice);
    console.log('thresholdValue: '+this.thresholdValue);
    console.log('ele thre Val: '+this.elethresholdValue);
    console.log('water thre Val: '+this.waterthresholdValue);
    console.log('gas thre Val: '+this.gasthresholdValue);

    this.linetypes= [
      {
        title: "National Average",
        check: false,
      },
      {
        title: "Neighbour Average",
        check: false,
      },
      {
        title:   "Previous Month",
        check: false,
      },
    ];

    this.reference=[
      {
        title: "National Average",
        check: false,
      },
      {
        title: "Neighbour Average",
        check: false,
      },
  {
        title:  "Usage in Previous Month",
        check: false,
      },
      {
        title:  "Custom",
        check: false,
      },


    ];

    this.refValue=[
      {
        iconName:"flash",
        name:"Electricity",
        value:[278.2,270.3,280],
        unit:' kWh'
      },
      {
        iconName:"water",
        name:"Water",
        value:[15.6,16.9,16.4],
        unit:' Cu M'
      },
      {
        iconName:"flame",
        name:"Gas",
        value:[178,169,189],
        unit:' kWh'
      }
    ];

    for(let i of this.linetypes){
      if(i.title == this.selectLineType){
        i.check=true;
      }
      else{
        i.check=false;
      }
    }


    this.reference[this.selectRefIndex].check=true;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  updateSelection(aveline){
    for(let i of this.linetypes){
      if(i.title==aveline.title){
          i.check=true;

            this.selectLineType=i.title;
        //this.dataService.setSetting(this.allowNotice,this.thresholdValue,this.selectLineType,this.selectRefIndex);
        console.log('update LineType: '+this.selectLineType);
      }
      else{
        i.check=false;
      }
    }
  }

  updateSelection1(ref){
    var n =0;
    for(let i of this.reference ){

      if(i.title==ref.title){
        i.check=true;

        this.selectRef=i.title;
        this.selectRefIndex=n;
        //this.dataService.setSetting(this.allowNotice,this.thresholdValue,this.selectLineType,this.selectRefIndex);
        console.log('update selectRefIndex: '+this.selectRefIndex);

      }
      else{
        i.check=false;
      }
      n++;
    }
  }

  ionViewCanLeave(){
    this.thresholdValue=[this.elethresholdValue,this.waterthresholdValue,this.gasthresholdValue];
    this.dataService.setSetting(this.allowNotice,this.thresholdValue,this.selectLineType,this.selectRefIndex);
    console.log('updateSettings: selectRefIndex: '+this.selectRefIndex);
    console.log('update LineType: '+this.selectLineType);
    console.log('update allowNotice: '+this.allowNotice);
    console.log('update thresholdValue: '+this.thresholdValue);
  }

}
