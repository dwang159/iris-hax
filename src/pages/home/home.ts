import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IrisProvider } from './../../providers/iris/iris';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  incidents = [];
  incident_start = 0;
  constructor(public navCtrl: NavController, public iris: IrisProvider) {
    console.log('hello world')
    iris.getIncident('6219580').subscribe((incident) => {console.log(incident)});
    this.incident_start = Date.now() - 7 * 86400000;
    iris.getIncidents(new Map([['created__ge', (this.incident_start / 1000 | 0).toString()], ['target', 'dewang']])).subscribe(
      (incidents: Array<object>) => {
        for (let i of incidents) {
          this.incidents.push(i);
        }
        console.log(incidents);
      })
  }

  doInfinite(infiniteScroll) {
    let old_start = this.incident_start;
    this.incident_start = this.incident_start - 7 * 86400000;
    // TODO: a little buggy, need some incident de-duping logic in case created lands on the boundary
    this.iris.getIncidents(new Map([['created__ge', (this.incident_start / 1000 | 0).toString()], 
      ['target', 'dewang'], ['created__le', (old_start / 1000 | 0).toString()]])).subscribe(
      (incidents: Array<object>) => {
        for (let i of incidents) {
          this.incidents.push(i);
        }
        infiniteScroll.complete();
      })
    console.log('infinite scrolling');
  }

}
