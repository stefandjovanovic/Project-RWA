import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './components/schedule/schedule.component';
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    ScheduleComponent
  ],
  exports: [
    ScheduleComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class SharedModule { }
