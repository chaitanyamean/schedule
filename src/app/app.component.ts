import { Component, OnInit, Inject } from '@angular/core';
import { ScheduleService } from './schedule.service';
import * as moment from 'moment';
import {
  MatDialog,
  MatDialogConfig, MAT_DIALOG_DATA
} from "@angular/material";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'scheduling-app';
 studiosList = [];
 date: string;
 studioName: string;
 isNoData: boolean;
 isTableDisplay: boolean;
 resObj: any;
  constructor(public scheduleService: ScheduleService, public dialog: MatDialog){}
  ngOnInit() {
    this.isNoData = false;
  this.isTableDisplay = false;

    this.studiosList = this.scheduleService.getStudioList()
  }

  search() {
    
this.date = this.formatDate(this.date);

let details = {
  'studioName' : this.studioName,
  'localDate': this.date
}

this.scheduleService.getSchedules(details).subscribe(data => {

  if(data === null) {
    this.isNoData = true;
    this.isTableDisplay = false;

    
  } else if(data){
    this.isNoData = true;
    this.isTableDisplay = true;
    this.resObj = data;

  }
  
})

  }


   formatDate(date) {
     if(typeof(date) === 'object') {
    var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    var day = date.getDate();
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    if(day <= '9') {
      day = '0' + day;
    } else {

    }
    return year + "-" + month + "-" + day;
     }
     return date;
}

addSchedule() {
  this.isNoData = false;

  let sendingObj = {
    'studioName' : this.studioName,
    'date': this.date,
    'isNew': true
  }

  const dialogRef = this.dialog.open(DialogContentExampleDialog, {
    data: {
      dataKey: sendingObj
    }
  });

    dialogRef.afterClosed().subscribe(result => {
      this.search();
    });
  }

  updateSchedule(resObj) {
    this.isNoData = false;
    resObj['isNew'] =  false
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: {
        dataKey: resObj
      }
    });
  
      dialogRef.afterClosed().subscribe(result => {
        this.search();
      });
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'new-schedule-dialog.html',
})
export class DialogContentExampleDialog implements OnInit {

  date: string;
  studioName: string;
  endTime: string;
  startTime:string;
  faculty:string;
  assignerName: string;
 studiosList = [];
 actionBtn: string;
 studioScheduleId: string;
 studioScheduleSlotId: string;
 constructor(public scheduleService: ScheduleService, @Inject(MAT_DIALOG_DATA) public data: any){
  
}

  ngOnInit() {
    this.actionBtn = 'Create Schedule'
    this.studiosList = this.scheduleService.getStudioList()
    if(this.data && this.data.dataKey.isNew === false) {
      this.isUpdate();
    } else {
      this.date = this.data.dataKey.date
this.studioName = this.data.dataKey.studioName
    }
  }

  isUpdate() {
this.date = this.data.dataKey.date
this.studioName = this.data.dataKey.studioName
this.endTime = this.data.dataKey.studioScheduleSlotList[0].endTime
this.startTime = this.data.dataKey.studioScheduleSlotList[0].startTime
this.faculty = this.data.dataKey.studioScheduleSlotList[0].faculty
this.assignerName = this.data.dataKey.studioScheduleSlotList[0].assignerName
this.studioScheduleSlotId = this.data.dataKey.studioScheduleSlotList[0].studioScheduleSlotId
this.studioScheduleId = this.data.dataKey.studioScheduleId
this.actionBtn = 'Update Schedule'

  }

  formatDate(date) {
    if(typeof(date) === 'object') {
   var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
   var day = date.getDate();
   var year = date.getFullYear();
   var month = months[date.getMonth()];
   if(day <= '9') {
     day = '0' + day;
   } else {

   }
   return year + "-" + month + "-" + day;
    }
    return date;
}

create() {
  this.date = this.formatDate(this.date);
if(this.actionBtn === 'Create Schedule') {
let details = {
  'studioName' : this.studioName,
  'date': this.date,
  'studioScheduleSlotList': [
    {
      'startTime': this.startTime,
      'endTime': this.endTime,
      'faculty': this.faculty,
      'assignerName': this.assignerName
    }
  ]
}

this.scheduleService.saveSchedule(details).subscribe(data => {
  console.log(data);
  
})
} else {

  let details = {
    'studioName' : this.studioName,
    'date': this.date,
    'studioScheduleId': this.studioScheduleId,
    'studioScheduleSlotList': [
      {
        'startTime': this.startTime,
        'endTime': this.endTime,
        'faculty': this.faculty,
        'assignerName': this.assignerName,
        'studioScheduleSlotId': this.studioScheduleSlotId
      }
    ]
  }
  
  this.scheduleService.updateSchedule(details).subscribe(data => {
    if(data['responseMsg'] === 'Schedule successfully updated') {
      
    } else {

    }
  })
  
}
}


}


