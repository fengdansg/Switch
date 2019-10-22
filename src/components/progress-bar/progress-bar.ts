import { Component,Input } from '@angular/core';

/**
 * Generated class for the ProgressBar component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBar {

 @Input('progress') progress;
 @Input('myColor') myColor;
  @Input('powerCons') powerCons;
  @Input('textCol') textCol;
  @Input('unitD') unitD;
 progress_outer:any;
 progress_inner:any;
 progressRatio:any;
  constructor() {
     console.log('unit:'+this.unitD);
    //this.progressRatio = this.progress.ratio;
    console.log("progress-bar.ts: progress.ratio ="+ this.progress);
    console.log("progress-bar: "+this.powerCons);

  }

}
