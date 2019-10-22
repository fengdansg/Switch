import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Chart} from 'chart.js';
import {Data} from "../../providers/data";

/**
 * Generated class for the SwitchAnalyticPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-switch-analytic',
  templateUrl: 'switch-analytic.html',
})
export class SwitchAnalyticPage {

  @ViewChild('barCanvas') barCanvas;
  switchData:any;
  timeLabel:any;
  barChart:any;
  selectData:any;
  selectLabel:any;
  selectColor:any="#fbb123";
  chosenDate: String = new Date().toISOString();
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: Data) {
    this.switchData=this.navParams.get('switchData');
    this.timeLabel='day';
    this.selectData=this.switchData.power.day;
    this.selectLabel=this.dataService.getLabel(this.chosenDate,this.timeLabel);
    console.log("the timeLabel for switchAnalyticPage: "+this.selectLabel);
  }

  ionViewDidLoad() {
    /*    let c1 =this.labelCanvas.nativeElement;
        let ctx1 =c1.getContext('2d');
        let cele = this.eleLabelCanvas.nativeElement;
        let ctxele = this.eleLabelCanvas.nativeElement.getContext('2d');
        let cwater = this.waterLabelCanvas.nativeElement;
        let ctxwater = this.waterLabelCanvas.nativeElement.getContext('2d');
        let cgas = this.gasLabelCanvas.nativeElement;
        let ctxgas = this.gasLabelCanvas.nativeElement.getContext('2d');
        let setheight = this.labelheight;
        let setwidth = this.labelwidth;*/
    //listen to the screen orientation


    //clear up the canvas

    // initial the bar chart

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.selectLabel,
        datasets: [

          {
            label: '',
            data: this.selectData,
            backgroundColor: this.selectColor,

            borderWidth: 0
          }]
      },
      options: {
        legend: {
          display: false
        },
        zoom: {
          enabled: true,
          mode: 'y',
          limits: {
            max: 10,
            min: 0.5
          },
        },

        scales: {
          yAxes: [{

            ticks: {
              beginAtZero:true,
              fontColor : '#254e66',
              fontSize: 13,
              fontStyle:'bold',
            }
          }],
          xAxes:[{


            gridLines:{
              display:false,
            },
            ticks:{
              autoSkip: false,
              fontColor : '#254e66',
              fontStyle:'bold',
              fontSize: 13,
              maxRotation:0,
              minRotation:0,
            }
          }]


        }
      }

    });
  }
  updateChart(){
    switch(this.timeLabel){
      case 'day':{
        this.selectData=this.switchData.power.day;
        break;
      }
      case 'week':{
        this.selectData=this.switchData.power.week;
        break;
      }
      case 'month':{
        this.selectData=this.switchData.power.month;
        break;
      }
      case 'year':{
        this.selectData=this.switchData.power.year;
        break;
      }
    }

    this.selectLabel=this.dataService.getLabel(this.chosenDate,this.timeLabel);

    let bar_chart = this.barChart;
    bar_chart.data.labels = this.selectLabel;
    bar_chart.data.datasets = [

      {

        data: this.selectData,
        backgroundColor: this.selectColor,

      }];
    bar_chart.clear();
    bar_chart.update();
  }

  returnToday():void{
    this.chosenDate = new Date().toISOString();
    this.updateChart();
  }

  doRefresh(refresher){


    this.updateChart();


    setTimeout(()=>{
      refresher.complete();
    },900);

  }
}
