import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
studio = ['Studio-1', 'Studio-2', 'Studio-3', 'Studio-4' ];
  constructor(private http: HttpClient) { }
url = 'http://13.232.30.248:8081/schedule'
httpOptions: any;

  getStudioList() {
    return this.studio;
  }


  getSchedules(details) {

    this.httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }

    let response = this.http.post(this.url + '/check', details, this.httpOptions)
    return response;
  }

  saveSchedule(details) {
    this.httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }

    let response = this.http.post(this.url, details, this.httpOptions)
    return response;
  }

  
  updateSchedule(details) {
    this.httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }

    let response = this.http.put(this.url, details, this.httpOptions)
    return response;
  }
}
