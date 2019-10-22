import { Component } from '@angular/core';
import {Events, IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {Data} from "../../providers/data";
import {FormControl} from "@angular/forms";
import  'rxjs/add/operator/debounceTime';
//import * as _ from 'lodash';
//import {SearchSwitchsPage} from "../search-switchs/search-switchs";
//import {IncentivePage} from "../incentive-page/incentive-page";
import {SwitchAnalyticPage} from "../switch-analytic/switch-analytic";

/**
 * Generated class for the SwitchsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-switchs',
  templateUrl: 'switchs.html',
})
export class SwitchsPage {



  searchTerm: string ='';
  searchControl:FormControl;
  switchitems:any;
  shownGroup:any;
  tabBarElement:any;
  searchList:any=false;
  switchsForm:any;
  sortedLists:any;
  test:any=99;
  testColor:any="#fbb123";
  warningColor:any='#F22613';
  textColor:any='#000000';
  switchState:any="true";
  totalHourCons:any;
  switchGroups:any;
  displayType:any;
  displayUnit:any;
  displayTotal:any=0;

  constructor(public navCtrl: NavController, public events: Events,public navParams: NavParams,public menuCtrl:MenuController,public dataService:Data) {
    //this.searchList=false;
    this.switchsForm='all';
    this.switchitems=this.dataService.switchs;
    this.switchGroups=this.dataService.switchsGroups;
    this.displayType="month";
    this.displayUnit="W";

    for (let swg of this.switchGroups)
    {
      console.log('switchGroup:'+swg);
    }
    for(let sw of this.switchitems){
      console.log(sw.power.month);
      sw.power.display=this.sumArray(sw.power.month);
     this.displayTotal=this.displayTotal+sw.power.display;
    }

    //sortBy name
    //this.switchGroups=this.switchGroups.sort((a,b)=>(a>b)?1:-1);
    //sort by Name first
    this.switchitems =this.switchitems.sort((a,b)=>
    {
      if(a.name>b.name){
        return 1;
      }
      if(a.name<b.name){
        return -1;
      }
      return 0;
    });
    //sort by current hourly power.

    this.totalHourCons =this.dataService.getCurrentTotal();
    this.searchControl = new FormControl();
    this.tabBarElement = document.querySelector('#tabs ion-tabbar-section');
    //listen to the change events of "searchList"
    this.events.publish('searchList:changed',this.searchList);
    this.sortedLists = this.switchitems.sort((a,b)=>
    {
      if(a.power.display<b.power.display){
        return 1;
      }
      if(a.power.display>b.power.display){
        return -1;
      }
      return 0;
    });

    console.log('searchList: '+this.searchList);
  }



  ionViewDidLoad() {
    this.switchGroups=this.dataService.switchsGroups;
    this.switchitems=this.dataService.switchs;


    this.displayTotal=0;
    switch(this.displayType){
      case 'month':
        for(let sw of this.switchitems){

          sw.power.display=this.sumArray(sw.power.month);
          this.displayTotal=this.displayTotal+sw.power.display;
        }
        this.displayUnit="$";
        break;
      case 'realtime':
        for(let sw of this.switchitems){
          sw.power.display=sw.power.realtime;
          console.log("realtime: "+sw.power.realtime);
          this.displayTotal=this.displayTotal+sw.power.display;
        }
        this.displayUnit="W";
        break;
      case 'day':
        for(let sw of this.switchitems){
          sw.power.display=this.sumArray(sw.power.day);
          this.displayTotal=this.displayTotal+sw.power.display;
        }
        this.displayUnit="$";
        break;
    }
    this.sortedLists = this.switchitems.sort((a,b)=>
    {
      if(a.power.display<b.power.display){
        return 1;
      }
      if(a.power.display>b.power.display){
        return -1;
      }
      return 0;
    });
    //this.searchSwitchsName();
    /*this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searchSwitchsName();


    });*/
    console.log('ionViewDidLoad SwitchsPage');
  }
  sumArray(a){
    let sum=0;
    for(let i of a){
      sum=+i;
    }
    console.log("sum of the array:"+sum)
    return sum;
  }
  viewMenu(): void {
    this.menuCtrl.open();

  }
  changeSelect(){
    this.switchitems=this.dataService.switchs;

    this.displayTotal=0;
    switch(this.displayType){
      case 'month':
        for(let sw of this.switchitems){
          console.log("this switch: "+sw.name);
          console.log(sw.power.month);
          sw.power.display=this.sumArray(sw.power.month);
          this.displayTotal=this.displayTotal+sw.power.display;
        }
        this.displayUnit="$";
        break;
      case 'realtime':
        for(let sw of this.switchitems){
          console.log("this switch: "+sw.name);
          sw.power.display=sw.power.realtime;
          console.log("realtime: "+sw.power.realtime);
          this.displayTotal=this.displayTotal+sw.power.display;
        }
        this.displayUnit="W";
        break;
      case 'day':
        for(let sw of this.switchitems){
          console.log("this switch: "+sw.name);
          console.log(sw.power.day);
          sw.power.display=this.sumArray(sw.power.day);
          this.displayTotal=this.displayTotal+sw.power.display;
        }
        this.displayUnit="$";
        break;
    }
    this.sortedLists = this.switchitems.sort((a,b)=>
    {
      if(a.power.display<b.power.display){
        return 1;
      }
      if(a.power.display>b.power.display){
        return -1;
      }
      return 0;
    });
  }
  sortedGroupLists(swgroup){
    var groupLists = this.sortedLists.filter(
     sw=>sw.group.includes(swgroup)

    );
    console.log("Group Name: "+swgroup);
    for(let item of groupLists)
    {
      console.log("switch Name: "+item.name)

    }

    return groupLists;
  }
/*
  goSearchPage(){

    //this.navCtrl.push(SearchSwitchsPage,{},{animate:false});
  }
*/

  searchSwitchsName(){
    this.switchitems=this.dataService.searchSwitchs(this.searchTerm);

  }

  onCancel(){
    this.searchList=false;
    this.events.publish('searchList:changed',this.searchList);

  }

  activeSearch(){


    this.searchList=true;
    this.events.publish('searchList:changed',this.searchList);
    console.log('searchList: '+this.searchList);
  }

  toggleMonthRank(group){
    if(this.isRankShown(group)){
      this.shownGroup=null;
    }
    else{
      this.shownGroup=group;
    }
  }

  isRankShown(group){
    return this.shownGroup == group;
  }

  addSwitchs(){

  }

  shownSwitch(sw,swgroup){
    for(let gp of sw.group){
      if (gp==swgroup){return true;}
    }
    return false;
  }

 isEmpty(obj){
    //check whether it is an empty object
    var item;
    for(item in obj){
      return false;
    }
    return true;
 }

  openSwitchAnalyticPage(sw){
    this.navCtrl.push(SwitchAnalyticPage,{
      switchData:sw
    });
  }


}
