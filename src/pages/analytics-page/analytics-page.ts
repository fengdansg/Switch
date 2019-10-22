import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import {Data} from "../../providers/data";
//import {TooltipModule} from 'angular2-tooltips';
/**
 * Generated class for the AnalyticsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()

@Component({
  selector: 'page-analytics-page',
  templateUrl: 'analytics-page.html',
})
export class AnalyticsPage {
  chosenDate: String = new Date().toISOString();
  selectPeriod:any;
  tableData:any;
  selectData:any;
  selectTitle:any;
  showeleTooltips:any;
  showwaterTooltips:any;
  showgasTooltips:any;
  @ViewChild('eleTooltipsCanvas') eleTooltipsCanvas;
  @ViewChild('waterTooltipsCanvas') waterTooltipsCanvas;
  @ViewChild('gasTooltipsCanvas') gasTooltipsCanvas;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService:Data, public menuCtrl:MenuController) {
    this.selectPeriod='day';
    this.tableData = this.dataService.getAnalytics();
    this.selectData = this.tableData.day;
    this.selectTitle = 'Hour';
    this.showeleTooltips=false;
    this.showwaterTooltips=false;
    this.showgasTooltips=false;
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter AnalyticsPage');

  }

  ionViewDidLoad() {
   this.draweleTooltips();
   this.drawwaterTooltips();
   this.drawgasTooltips();
    this.showeleTooltips=false;
    this.showwaterTooltips=false;
    this.showgasTooltips=false;

  }

  draweleTooltips(){
    let c1 =this.eleTooltipsCanvas.nativeElement;
    let ctx1 =c1.getContext('2d');
    let radius =0.1;
    let w = c1.width;
    let h = c1.height*6/7;
    let anglesize=0.1;
    ctx1.save();

    ctx1.clearRect(0, 0, c1.width, c1.height);
    ctx1.beginPath();
    ctx1.moveTo(radius*w,0);
    ctx1.lineTo((1-radius)*w,0);
    ctx1.quadraticCurveTo (w,0,w,radius*h);
    ctx1.lineTo(w,(1-radius)*h);
    ctx1.quadraticCurveTo(w,h,(1-radius)*w,h);
    ctx1.lineTo((0.5+anglesize)*w,h);
    ctx1.lineTo(0.5*w,c1.height);
    ctx1.lineTo((0.5-anglesize)*w,h);
    ctx1.lineTo(radius*w,h);
    ctx1.quadraticCurveTo(0,h,0,(1-radius)*h);
    ctx1.lineTo(0,radius*h);
    ctx1.quadraticCurveTo(0,0,radius*w,0);
    ctx1.strokeStyle="#000000";

    ctx1.fillStyle="#000000";
    ctx1.fill();
    ctx1.font='bold 30px Helvetica';
    ctx1.textAlign='center';
    ctx1.fillStyle='#FFFFFF';
    ctx1.fillText('kWh',0.5*w,0.6*c1.height);
  }

  drawwaterTooltips(){
    let c1 =this.waterTooltipsCanvas.nativeElement;
    let ctx1 =c1.getContext('2d');
    let radius =0.1;
    let w = c1.width;
    let h = c1.height*6/7;
    let anglesize=0.1;
    ctx1.save();

    ctx1.clearRect(0, 0, c1.width, c1.height);
    ctx1.beginPath();
    ctx1.moveTo(radius*w,0);
    ctx1.lineTo((1-radius)*w,0);
    ctx1.quadraticCurveTo (w,0,w,radius*h);
    ctx1.lineTo(w,(1-radius)*h);
    ctx1.quadraticCurveTo(w,h,(1-radius)*w,h);
    ctx1.lineTo((0.5+anglesize)*w,h);
    ctx1.lineTo(0.5*w,c1.height);
    ctx1.lineTo((0.5-anglesize)*w,h);
    ctx1.lineTo(radius*w,h);
    ctx1.quadraticCurveTo(0,h,0,(1-radius)*h);
    ctx1.lineTo(0,radius*h);
    ctx1.quadraticCurveTo(0,0,radius*w,0);
    ctx1.strokeStyle="#000000";

    ctx1.fillStyle="#000000";
    ctx1.fill();
    ctx1.font='bold 30px Helvetica';
    ctx1.textAlign='center';
    ctx1.fillStyle='#FFFFFF';
    ctx1.fillText('Cu M',0.5*w,0.6*c1.height);
  }

  drawgasTooltips(){
    let c1 =this.gasTooltipsCanvas.nativeElement;
    let ctx1 =c1.getContext('2d');
    let radius =0.1;
    let w = c1.width;
    let h = c1.height*6/7;
    let anglesize=0.1;
    ctx1.save();

    ctx1.clearRect(0, 0, c1.width, c1.height);
    ctx1.beginPath();
    ctx1.moveTo(radius*w,0);
    ctx1.lineTo((1-radius)*w,0);
    ctx1.quadraticCurveTo (w,0,w,radius*h);
    ctx1.lineTo(w,(1-radius)*h);
    ctx1.quadraticCurveTo(w,h,(1-radius)*w,h);
    ctx1.lineTo((0.5+anglesize)*w,h);
    ctx1.lineTo(0.5*w,c1.height);
    ctx1.lineTo((0.5-anglesize)*w,h);
    ctx1.lineTo(radius*w,h);
    ctx1.quadraticCurveTo(0,h,0,(1-radius)*h);
    ctx1.lineTo(0,radius*h);
    ctx1.quadraticCurveTo(0,0,radius*w,0);
    ctx1.strokeStyle="#000000";

    ctx1.fillStyle="#000000";
    ctx1.fill();
    ctx1.font='bold 30px Helvetica';
    ctx1.textAlign='center';
    ctx1.fillStyle='#FFFFFF';
    ctx1.fillText('kWh',0.5*w,0.6*c1.height);
  }
  updateTable(){
    this.tableData = this.dataService.getAnalytics();
    if(this.selectPeriod=='day'){
      this.selectData = this.tableData.day;
      this.selectTitle = 'Hour';

    }
    else if(this.selectPeriod == 'month'){
      this.selectData = this.tableData.month;
      this.selectTitle = 'Day';
    }
    else if(this.selectPeriod == 'year'){
      this.selectData = this.tableData.year;
      this.selectTitle = 'Month';
    }
    else{
      console.log("Error message, select: "+this.selectPeriod);
    }


  }

  changeeletooltip(){
   this.showeleTooltips=true;
    console.log("showeleTooltips: "+this.showeleTooltips);
    this.draweleTooltips();
/*    if(this.showeleTooltips){
      this.showeleTooltips=false;
      console.log("showeleTooltips: "+this.showeleTooltips);
    }
    else{
      this.showeleTooltips=true;
      console.log("showeleTooltips: "+this.showeleTooltips);
      this.draweleTooltips();
    }*/
  }
  disabeeleTooltips(){
    this.showeleTooltips=false;
    console.log("showeleTooltips: "+this.showeleTooltips);
  }

  changewatertooltip(){
    this.showwaterTooltips=true;
    console.log("showwaterTooltips: "+this.showwaterTooltips);
    this.drawwaterTooltips();

  }
  disabewaterTooltips(){
    this.showwaterTooltips=false;
    console.log("showwaterTooltips: "+this.showwaterTooltips);
  }

  changegastooltip(){
    this.showgasTooltips=true;
    console.log("showgasTooltips: "+this.showgasTooltips);
    this.drawgasTooltips();
  }

  disabegasTooltips(){
    this.showgasTooltips=false;
    console.log("showgasTooltips: "+this.showgasTooltips);
  }
  viewMenu(){
    this.menuCtrl.open();
  }

}
