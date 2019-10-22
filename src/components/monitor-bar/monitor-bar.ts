import {Component, Input} from '@angular/core';

/**
 * Generated class for the MonitorBar component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'monitor-bar',
  templateUrl: 'monitor-bar.html'
})
export class MonitorBar {
  @Input('progress') progress;
  @Input('myColor') myColor;
  @Input('powerCons') powerCons;
  @Input('unitD') unitD;
  progress_outer:any;
  progress_inner:any;
  progressRatio:any;
  constructor() {
    console.log('unit:'+this.unitD);
  console.log("monitor-bar: "+this.powerCons);
  }

}
