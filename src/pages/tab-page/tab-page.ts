import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";
//import {MonitoringPage} from "../monitoring-page/monitoring-page";
//import {SchedulePage} from "../schedule-page/schedule-page";
import {AnalyticsPage} from "../analytics-page/analytics-page";
import {RankingPage} from "../ranking-page/ranking-page";
//import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {SmartAudioProvider} from "../../providers/smart-audio/smart-audio";
import {SwitchsPage} from "../switchs/switchs";

/**
 * Generated class for the TabPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tab-page',
  templateUrl: 'tab-page.html',
})
export class TabPage {
  tab1Root: any = HomePage;
  tab2Root:any = SwitchsPage;
  tab3Root: any = RankingPage;
  tab4Root: any = AnalyticsPage;
  searchList:any;

  constructor(public navCtrl: NavController, public events:Events,public navParams: NavParams,public smartAudio:SmartAudioProvider) {
    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    events.subscribe('searchList:changed',(searchList)=>{

      this.searchList = searchList;
      console.log('Tab-page.ts events:'+this.searchList)
    });
  }

  changeTab() {
    this.smartAudio.play('tabSwitch');
    console.log('change tab page')
  }

}
