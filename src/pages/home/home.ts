import {Component, ViewChild} from '@angular/core';
import {NavController, Events, Platform} from 'ionic-angular';

//import { ScreenOrientation } from '@ionic-native/screen-orientation';
import {MenuController} from 'ionic-angular';
import * as moment from 'moment';
//import moment from 'moment'
//import {moment} from '../../../node_modules/moment'
import {Chart} from 'chart.js';
import {Data} from "../../providers/data";
import{Content} from 'ionic-angular';
function printPrice(price) {
  var str1 = new String(price);
  var splitStr = str1.split(".",2);
  if (splitStr[1].length == 0) {splitStr[1] += "00";}
  else if (splitStr[1].length == 1) {splitStr[1] += "0";}
  return "$" + splitStr[0] + "." + splitStr[1];
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  chosenDate: any = new Date().toISOString();


  @ViewChild('gaugeCanvas') gaugeCanvas;
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('labelCanvas') labelCanvas;
  @ViewChild('eleLabelCanvas') eleLabelCanvas;
  @ViewChild('waterLabelCanvas') waterLabelCanvas;
  @ViewChild('gasLabelCanvas') gasLabelCanvas;
 @ViewChild('gaugeCard') gaugeCard;
  @ViewChild(Content) content:Content;
  //@ViewChild('ionContent') ionContent;

  barChart   :  any;
  resRatio   : any;

  gaugeChart: any;
  dayData: any;
  weekData: any;
  monthData: any;
  yearData:any;

  roomlists:any;
  timeLabel: string;
  readings: any;
  titles:any;
  title2s:any;
  title3s:any;
  title4s:any;
  total_Day:any;
  total_Week:any;
  total_Month:any;
  total_Year:any;
  loadProgress:any;
  total_consumption:any;

  chartData:any;
  selectData:any;
  selectLabel:any;
  selectAverage:any;
  selectUtility: any;
  selectColor:any;
  eleColor: any;
  elelight:any;
  waterColor: any;
  waterlight:any;
  gasColor: any;
  gaslight:any;
  elePercentage:any;
  waterPercentage:any;
  gasPercentage:any;
  gaugeData:any;
  selectGauge:any;
  orientation:any;
  labelheight:any;
  labelwidth:any;
  settings:any;
  selectRefIndex:any;
  thresholdValue:any;
  selectLineType:any;
  allowNotice:any;

  constructor(public platform: Platform,public navCtrl: NavController, public dataService:Data, public menuCtrl:MenuController,public events:Events) {
    events.subscribe('aveLineType:changed',(aveLineType)=>{

      this.selectLineType = aveLineType;
      console.log('app.component.ts events:'+this.selectLineType)
    });


    this.resRatio = 3;

    //read the setting from data.ts
    this.settings = dataService.getSetting();
    this.selectRefIndex=this.settings.refIndex;
    this.thresholdValue=this.settings.threshold;
    this.allowNotice=this.settings.allowNotice;
    this.selectLineType = this.settings.lineType;
    console.log('Settings: selectRefIndex: '+this.selectRefIndex);
    console.log('LineType: '+this.selectLineType);
    console.log('allowNotice: '+this.allowNotice);
    console.log('thresholdValue: '+this.thresholdValue);
    // Listen for orientation changes

    this.total_consumption =0;
    this.timeLabel = "day";
    this.loadProgress= 10;
    this.selectUtility= "ele";
   this.elelight ='#f1a097';
    this.gasColor =  '#f27767';
    this.waterlight='#81ded2';
    this.waterColor= '#66c6ba';
    this.gaslight='#fbcd75';
    this.eleColor= '#f0a007';
    this.selectColor = this.eleColor;
  //  this.roomlists = this.dataService.getRoomLists();
    this.dataService.setLabel(this.chosenDate);
    this.chartData = this.dataService.getemaData();
    this.gaugeData = this.dataService.getemaAnalytics();
    this.selectGauge = this.gaugeData.day;
    this.selectData = this.chartData.day.eleData;
    this.selectLabel = this.chartData.day.label;
    this.selectAverage = this.chartData.day.eleaverage;
    console.log("home.ts testing ");
    this.total_Day = 13.6;
    this.total_Week = 89.4;
    this.total_Month = 320.2;
    this.total_Year = 4132.2;
    this.dayData = [80,20];
    this.weekData = [45,55];
    this.monthData = [23, 77];
    this.yearData = [72,28];
/*    this.dayColor = '#F05053';
    this.weekColor =  '#f9d121';
    this.monthColor = '#78C585';
    this.yearColor = '#F6903D';
    this.dayBGColor = [ '#F05053','#EDEDED'];
    this.weekBGColor = ['#f9d121','#EDEDED'];
    this.monthBGColor = ['#78C585','#EDEDED'];
    this.yearBGColor = ['#F6903D','#EDEDED'];
    this.dayText = '80%';
    this.weekText = '45%';
    this.monthText ='23%';
    this.yearText='72%';*/
    this.readings = [this.total_Day.toString()+' kWh'];
    this.titles  = ['Day'];
    this.title2s  =['Week'];
    this.title3s  = ['Month'];
    this.title4s  = ['Year'];
    this.labelheight = 190.15;
    this.labelwidth = 303.2;
    //this.labelheight= this.labelCanvas.nativeElement.height;
   // this.labelwidth = this.labelCanvas.nativeElement.width;
    //this.orientation=this.screenOrientation.type;

/*
    this.curData1 ={
      data:this.dayData,
      chartColor:this.dayBGColor,
      text:this.dayText,
      textColor:this.dayColor,
    };

    this.curData2 ={
      data:this.weekData,
      chartColor:this.weekBGColor,
      text:this.weekText,
      textColor:this.weekColor,
    };

    this.curData3 ={
      data:this.monthData,
      chartColor:this.monthBGColor,
      text:this.monthText,
      textColor:this.monthColor,
    };

    this.curData4 ={
      data:this.yearData,
      chartColor:this.yearBGColor,
      text:this.yearText,
      textColor:this.yearColor,
    };*/
// write text in doughnut chart plugin
    Chart.pluginService.register({
      beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
          //Get ctx from string
          var ctx = chart.chart.ctx;
          //clear the canvas before draw the text in the gauge chart
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          console.log("chartPlugin: W:"+ctx.canvas.width+" H:"+ctx.canvas.height);
          //Get options from the center object in options
          var centerConfig = chart.config.options.elements.center;
          var fontStyle = centerConfig.fontStyle || 'Arial';
          var fontWeight = centerConfig.fontWeight|| 'normal';
          var txt = printPrice(centerConfig.price);
          var color = centerConfig.color || '#000';
          var sidePadding = centerConfig.sidePadding || 20;
          var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
          //Start with a base font of 30px
          ctx.font = fontWeight+" 30px " + fontStyle;

          //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          var stringWidth = ctx.measureText(txt).width;
          var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

          // Find out how much the font can grow in width.
          var widthRatio = elementWidth / stringWidth;
          var newFontSize = Math.floor(30 * widthRatio);
          var elementHeight = (chart.innerRadius * 2);

          // Pick a new font size so it will not be larger than the height of label.
          var fontSizeToUse = Math.min(newFontSize, elementHeight);

          //Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
          //var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
          var centerY = chart.chartArea.bottom -37;
          ctx.font = fontWeight+" "+fontSizeToUse+"px " + fontStyle;
          ctx.fillStyle = color;

          //Draw text in center
          ctx.fillText(txt, centerX, centerY);
        }
      }
    });
    //chart.js plugin to add in the text


  }


 /* ionViewDidEnter(){
    let c1 =this.labelCanvas.nativeElement;
    let ctx1 =c1.getContext('2d');
    let cele = this.eleLabelCanvas.nativeElement;
   let ctxele = this.eleLabelCanvas.nativeElement.getContext('2d');
    let cwater = this.waterLabelCanvas.nativeElement;
    let ctxwater = this.waterLabelCanvas.nativeElement.getContext('2d');
    let cgas = this.gasLabelCanvas.nativeElement;
    let ctxgas = this.gasLabelCanvas.nativeElement.getContext('2d');
    let setheight = this.labelheight;
    let setwidth = this.labelwidth;
    //listen to the screen orientation
/!*    window.addEventListener("orientationchange", function() {
      // Announce the new orientation numbera
      //alert(window.orientation);
      if(window.orientation == 0){
        c1.height = setheight;
        cgas.height=setheight;
        cele.height = setheight;
        cwater.height = setheight;
      }
      else if(window.orientation == 90){
        c1.height=0;
        cele.height=0;
        cwater.height=0;
        cgas.height=0;

      }
    }, false);*!/

  }*/


ionViewWillEnter(){
  this.settings = this.dataService.getSetting();
  this.selectLineType = this.settings.lineType;
  console.log('Settings: selectRefIndex: '+this.selectRefIndex);

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
          type: 'line',
          data:this.selectAverage,
          borderColor: '#294f66',
          borderDash:[10,5],
            borderWidth:2,
          fill:false,
          radius: 0,
        },
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

// initialize the gauge chart
/*    var c= <HTMLCanvasElement>document.getElementById("gaugeCanvas");
    var ctx=c.getContext("2d");
    var my_gradient1 = ctx.createLinearGradient(0,0,0,170);
    my_gradient1.addColorStop(0,this.elelight);
    my_gradient1.addColorStop(0,this.eleColor);*/
    //draw label of the gauge chart

    //clear up the canvas before draw
    let ctxgauge =this.gaugeCanvas.nativeElement.getContext('2d');
    //let cgauge = this.gaugeCanvas.nativeElement;
    ctxgauge.canvas.width= this.gaugeCard.nativeElement.offsetWidth * 0.8;
    //cgauge.height=cgauge.width;
    ctxgauge.save();
    ctxgauge.clearRect(0, 0, this.gaugeCanvas.nativeElement.width, this.gaugeCanvas.nativeElement.height);
    console.log("gaugeCanvas: W:"+this.gaugeCanvas.nativeElement.width+" H:"+this.gaugeCanvas.nativeElement.height);
    //  draw gauge chart
    this.gaugeChart = new Chart(this.gaugeCanvas.nativeElement,{
      type:'doughnut',
      data:{
        datasets:[{
          data:[this.selectGauge.sumele,this.selectGauge.maxele-this.selectGauge.sumele],
          backgroundColor: [this.eleColor,'#FFFFFF'],
        },
          {
            data:[this.selectGauge.sumwater,this.selectGauge.maxwater-this.selectGauge.sumwater],
            backgroundColor:[this.waterColor,'#FFFFFF'],
          },
          {
            data:[this.selectGauge.sumgas,this.selectGauge.maxgas-this.selectGauge.sumgas],
            backgroundColor:[this.gasColor,'#FFFFFF'],
          }]
      },
      options:{
        //maintainAspectRatio: true,
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage:65,
        tooltips:{
          enabled:false
        },
        hover:{
          mode:null
        },
        legend:{
          display:false
        },

        rotation:1*Math.PI,
        circumference: 1*Math.PI,
        elements:{
          arc:{
            borderWidth:0,
          },
          center: {

            //text: "$",
            price: this.selectGauge.price,
            color: '#294f66',
            fontStyle: 'Helvetica ',
            fontWeight:'bold',
            sidePadding: 30,
          }
        }
      }
    });

 /*   let gaugectx = this.gaugeCanvas.nativeElement.getContext('2d');
    gaugectx.translate()*/


    this.drawGaugeLabel();
    //draw GaugeLabel

    //this.labelheight= this.labelCanvas.nativeElement.height;
    //this.labelwidth = this.labelCanvas.nativeElement.width;
    console.log("label Canvas size:"+this.labelheight+' X '+this.labelwidth);
    console.log("orientation: "+this.orientation);





  }



 drawGaugeLabel(){

    this.elePercentage = this.selectGauge.sumele/this.selectGauge.maxele;
    this.waterPercentage = this.selectGauge.sumwater/this.selectGauge.maxwater;
    this.gasPercentage = this.selectGauge.sumgas/this.selectGauge.maxgas;
    this.elePercentage = this.elePercentage.toFixed(2);
    this.waterPercentage =this.waterPercentage.toFixed(2);
    this.gasPercentage = this.gasPercentage.toFixed(2);
   let c1 =this.labelCanvas.nativeElement;
   let ctx1 =c1.getContext('2d');
   let cele = this.eleLabelCanvas.nativeElement;
   let ctxele = this.eleLabelCanvas.nativeElement.getContext('2d');
   let cwater = this.waterLabelCanvas.nativeElement;
   let ctxwater = this.waterLabelCanvas.nativeElement.getContext('2d');
   let cgas = this.gasLabelCanvas.nativeElement;
   let ctxgas = this.gasLabelCanvas.nativeElement.getContext('2d');
   c1.height = this.gaugeCard.nativeElement.offsetHeight*this.resRatio;
   c1.width = this.gaugeCard.nativeElement.offsetWidth*this.resRatio;


   cele.height = this.gaugeCard.nativeElement.offsetHeight*this.resRatio ;
   cele.width = this.gaugeCard.nativeElement.offsetWidth*this.resRatio;
   cwater.height = this.gaugeCard.nativeElement.offsetHeight*this.resRatio ;
   cwater.width = this.gaugeCard.nativeElement.offsetWidth*this.resRatio;
   cgas.height = this.gaugeCard.nativeElement.offsetHeight *this.resRatio;
   cgas.width = this.gaugeCard.nativeElement.offsetWidth*this.resRatio;
   //clear up the canvas before draw anything
   ctx1.save();
   ctxele.save();
   ctxwater.save();
   ctxgas.save();
   ctx1.clearRect(0, 0, c1.width, c1.height);
   console.log("labelCanvas: W:"+c1.width+" H:"+c1.height);
   ctxele.clearRect(0, 0, cele.width, cele.height);
   ctxgas.clearRect(0, 0, cgas.width, cgas.height);
   ctxwater.clearRect(0,0, cwater.width, cwater.height);
   console.log("eleLabelCanvas: W:"+cele.width+" H:"+cele.height);
   console.log("waterLabelCanvas: W:"+cwater.width+" H:"+cwater.height);
   console.log("gasLabelCanvas: W:"+cgas.width+" H:"+cgas.height);

     console.log("card_size:"+ this.gaugeCard.nativeElement.offsetHeight+' X '+this.gaugeCard.nativeElement.offsetWidth);


   //time delay for the label
    setTimeout(() =>{
      let lwidth= 0.006 * this.gaugeCard.nativeElement.offsetWidth*this.resRatio;
      let fontSize = 0.04 * this.gaugeCard.nativeElement.offsetWidth*this.resRatio;
        // draw gas label
        ctx1.beginPath();
        var cheight= c1.height;
        var cwidth = c1.width;
        var startX = 0.5*cwidth;
        var startY = 0.941*cheight;
        var centerX =0.5*cwidth;
        var centerY = 0.9505*cheight;
        var lengthgas1 =0.23070*cwidth;
        var lengthwater1 =0.2725*cwidth;
        var lengthele1 = 0.3120*cwidth;
        startX = centerX +lengthgas1*Math.cos(Math.PI*(1-this.gasPercentage));
       startY = centerY-lengthgas1*Math.sin(Math.PI*(1-this.gasPercentage));
      //startX = centerX;
      //startY = centerY;
        ctx1.moveTo(startX,startY);
        var lengthgas2 = 0.26*cwidth;
        endX = startX+lengthgas2*Math.cos(Math.PI*(1-this.gasPercentage));
       endY = startY-lengthgas2*Math.sin(Math.PI*(1-this.gasPercentage));
      //endX = startX+lengthgas2*Math.cos(Math.PI*(1-0.5));
      //endY = startY-lengthgas2*Math.sin(Math.PI*(1-0.5));
        ctx1.lineTo(endX,endY);
        ctx1.strokeStyle=this.gasColor;
        ctx1.lineWidth = lwidth;
        ctx1.stroke();

        ctxgas.beginPath();
        ctxgas.translate(endX,endY);
        ctxgas.rotate((this.gasPercentage-0.5)*Math.PI);
        ctxgas.font = "bold "+fontSize+"px Helvetica";
        ctxgas.fillStyle = this.gasColor;
        if(this.gasPercentage>0.25){
          ctxgas.textAlign = "right";
          ctxgas.fillText((this.gasPercentage*100).toString()+"%",-4,fontSize*1);
        }
        else{
          ctxgas.textAlign="left";
          ctxgas.fillText((this.gasPercentage*100).toString()+"%",3,12);
        }

        ctxgas.closePath();
        ctxgas.restore();


        // draw water label
        ctx1.beginPath();
        startX = centerX +lengthwater1*Math.cos(Math.PI*(1-this.waterPercentage));
        startY = centerY-lengthwater1*Math.sin(Math.PI*(1-this.waterPercentage));
        ctx1.moveTo(startX,startY);
        var lengthwater2 = 0.175*cwidth;
        endX = startX+lengthwater2*Math.cos(Math.PI*(1-this.waterPercentage));
        endY = startY-lengthwater2*Math.sin(Math.PI*(1-this.waterPercentage));
        ctx1.lineTo(endX,endY);
        ctx1.strokeStyle=this.waterColor;
        ctx1.lineWidth =lwidth;
        ctx1.stroke();

        ctxwater.beginPath();
        ctxwater.translate(endX,endY);
        ctxwater.rotate((this.waterPercentage-0.5)*Math.PI);
        ctxwater.font = "bold "+fontSize+"px Helvetica";
        ctxwater.fillStyle = this.waterColor;
        if(this.waterPercentage>0.25){
          ctxwater.textAlign = "right";
          ctxwater.fillText((this.waterPercentage*100).toString()+"%",-4,fontSize);
        }
        else{
          ctxwater.textAlign="left";
          ctxwater.fillText((this.waterPercentage*100).toString()+"%",3,fontSize);
        }

        ctxwater.closePath();
        ctxwater.restore();

        //draw electricity label
        ctx1.beginPath();
        startX = centerX +lengthele1*Math.cos(Math.PI*(1-this.elePercentage));
        startY = centerY-lengthele1*Math.sin(Math.PI*(1-this.elePercentage));
        ctx1.moveTo(startX,startY);
        var lengthele2 = 0.086*cwidth;
        var endX = startX+lengthele2*Math.cos(Math.PI*(1-this.elePercentage));
        var endY = startY-lengthele2*Math.sin(Math.PI*(1-this.elePercentage));
        ctx1.lineTo(endX,endY);
        ctx1.strokeStyle=this.eleColor;
        ctx1.lineWidth =lwidth;
        ctx1.closePath();
        ctx1.stroke();
        ctx1.restore();


        ctxele.beginPath();
        ctxele.translate(endX,endY);
        ctxele.rotate((this.elePercentage-0.5)*Math.PI);
        ctxele.font = "bold "+fontSize+"px Helvetica";
        ctxele.fillStyle = this.eleColor;

        if(this.elePercentage>0.25){
          ctxele.textAlign = "right";
          ctxele.fillText((this.elePercentage*100).toString()+"%",-4,fontSize);
        }
        else{
          ctxele.textAlign = "left";
          ctxele.fillText((this.elePercentage*100).toString()+"%",3,fontSize);
        }

        ctxele.closePath();
        ctxele.restore();

    },1000);



  }


// update the chart by selected different tab bar
  updateChart() {
    // time tab bar
    this.dataService.setLabel(this.chosenDate);
    this.chartData = this.dataService.getemaData();
    this.gaugeData = this.dataService.getemaAnalytics();
    if(this.timeLabel=='day'){
      this.selectData = this.chartData.day;
      this.selectLabel = this.chartData.day.label;
      this.selectAverage = this.chartData.day;
      this.selectGauge = this.gaugeData.day;

    }

    else if(this.timeLabel == 'week'){
      this.selectData = this.chartData.week;
      this.selectLabel = this.chartData.week.label;
      this.selectAverage = this.chartData.week;
      this.selectGauge = this.gaugeData.week;

    }

    else if(this.timeLabel == 'month'){
      this.selectData = this.chartData.month;
      this.selectLabel = this.chartData.month.label;
      this.selectAverage = this.chartData.month;
      this.selectGauge = this.gaugeData.month;
    }

    else if(this.timeLabel == 'year'){
      this.selectData = this.chartData.year;
      this.selectLabel = this.chartData.year.label;
      this.selectAverage = this.chartData.year;
      this.selectGauge = this.gaugeData.year;
    }
    else{
      console.log('error on the time bar, timeLabel: '+this.timeLabel);
    }
    if(this.selectUtility=='ele'){
      this.selectData = this.selectData.eleData;
      this.selectAverage = this.selectAverage.eleaverage;
      this.selectColor = '#f0a007';
    }
    else if(this.selectUtility=='water'){
      this.selectData = this.selectData.waterData;
      this.selectAverage = this.selectAverage.wateraverage;
      this.selectColor = '#66c6ba';
    }
    else if(this.selectUtility=='gas'){
      this.selectData = this.selectData.gasData;
      this.selectAverage = this.selectAverage.gasaverage;
      this.selectColor ='#f27767'
    }
    else{
      console.log('error on the utility bar');
    }

    //update the bar chart
    let bar_chart = this.barChart;
    bar_chart.data.labels = this.selectLabel;
    bar_chart.data.datasets = [
      {
        type: 'line',
        data:this.selectAverage,
        borderColor: '#294f66',
        borderDash:[10,5],
        borderWidth:2,
        fill:false,
        radius: 0,
      },
      {

      data: this.selectData,
      backgroundColor: this.selectColor,

    }];
    bar_chart.clear();
    bar_chart.update();

    let gauge_chart = this.gaugeChart;
    gauge_chart.data.datasets =
      [{
        data:[this.selectGauge.sumele,this.selectGauge.maxele-this.selectGauge.sumele],
        backgroundColor: [this.eleColor,'#FFFFFF'],
      },
        {
          data:[this.selectGauge.sumwater,this.selectGauge.maxwater-this.selectGauge.sumwater],
          backgroundColor:[this.waterColor,'#FFFFFF'],
        },
        {
          data:[this.selectGauge.sumgas,this.selectGauge.maxgas-this.selectGauge.sumgas],
          backgroundColor:[this.gasColor,'#FFFFFF'],
        }];
    gauge_chart.options.elements.center.price = this.selectGauge.price;
    gauge_chart.clear();
    gauge_chart.update();

    this.drawGaugeLabel();
    //update the doughnut chart
/*
    let chart1 = this.doughChart1;
    chart1.data.datasets = [{
      label: '# kWh',
      data: this.curData1.data,
      backgroundColor: this.curData1.chartColor,
    }];
    chart1.options.elements.center.text = this.curData1.text;
    chart1.options.elements.center.color = this.curData1.textColor;
    chart1.clear();
    chart1.update();
*/



  }

  viewMenu(): void {
   this.menuCtrl.open();

  }



  backOneday(): void {
    this.chosenDate = moment(this.chosenDate).subtract(1, 'days').toISOString();
  }

  forwardOneday(): void {
    this.chosenDate = moment(this.chosenDate).add(1, 'days').toISOString();
  }
  returnToday():void{
    this.chosenDate = new Date().toISOString();
    this.updateChart();
  }

  public ngOnInit() {
    this.settings = this.dataService.getSetting();
    this.selectLineType = this.settings.lineType;
  }

  update(){
   this.content.resize();
  }

  doRefresh(refresher){


      this.updateChart();
      this.settings = this.dataService.getSetting();
      this.selectLineType = this.settings.lineType;
      console.log('Settings: selectLineType: '+this.selectLineType);

   setTimeout(()=>{
    refresher.complete();
   },900);

  }


}

