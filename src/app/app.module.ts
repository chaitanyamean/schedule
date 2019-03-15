import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatNativeDateModule, MatDatepickerModule, MatSelectModule, MatFormFieldModule, MatInputModule, NativeDateModule, MatDialogModule, MatCardModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import { AppComponent, DialogContentExampleDialog } from './app.component';
import { ScheduleService } from './schedule.service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    DialogContentExampleDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxMaterialTimepickerModule.forRoot(),
    ToastrModule.forRoot(),
    MatButtonModule, MatCheckboxModule,MatDatepickerModule,        // <----- import(must)
    MatNativeDateModule, MatCardModule,MatSelectModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatDatepickerModule, NativeDateModule
  ],
  entryComponents: [DialogContentExampleDialog],
  providers: [ScheduleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
