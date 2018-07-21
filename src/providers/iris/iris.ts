import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the IrisProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IrisProvider {
  // Hack to get around CORS, have localhost:8100 proxy to iris.prod.linkedin.com/v0
  baseUrl: string = 'http://localhost:8100/iris_api'; //'https://iris.prod.linkedin.com/v0';
  constructor(public http: HttpClient) {
    console.log('Hello IrisProvider Provider');
  }
  public getIncidents(filters: Map<string, string>) {
    let params = new HttpParams();
    filters.forEach((filter: string, value: string) => {
      params = params.append(value, filter);
    });
    return this.http.get(this.baseUrl + '/incidents', { params: params })
  }
  public getIncident(incident_id: string) {
    return this.http.get(this.baseUrl + '/incidents/' + incident_id)
  }
}
