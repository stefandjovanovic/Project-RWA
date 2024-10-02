import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourtEditComponent } from './components/court-edit/court-edit.component';
import { CourtNewComponent } from './components/court-new/court-new.component';
import { CourtEventsComponent } from './components/court-events/court-events.component';
import { EventNewComponent } from './components/event-new/event-new.component';
import { EventsDisplayComponent } from './components/events-display/events-display.component';
import { EventsMapComponent } from './components/events-map/events-map.component';
import { EventsNearbyComponent } from './components/events-nearby/events-nearby.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {EventsRoutingModule} from "./events-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {ControlComponent, MapComponent, MarkerComponent, NavigationControlDirective} from "@maplibre/ngx-maplibre-gl";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatStepperModule} from "@angular/material/stepper";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDialogModule} from "@angular/material/dialog";
import {MatListModule} from "@angular/material/list";
import {MatSliderModule} from "@angular/material/slider";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatMenuModule} from "@angular/material/menu";
import { CourtEditDetailsComponent } from './components/court-edit/court-edit-details/court-edit-details.component';
import { DeleteDialogComponent } from './components/court-edit/delete-dialog/delete-dialog.component';
import { HallsComponent } from './components/halls/halls.component';
import { HallEditComponent } from './components/halls/hall-edit/hall-edit.component';
import { HallEventsListComponent } from './components/halls/hall-events-list/hall-events-list.component';
import { HallNewComponent } from './components/halls/hall-new/hall-new.component';
import { HallsListComponent } from './components/halls/halls-list/halls-list.component';
import {SharedModule} from "../shared/shared.module";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";



@NgModule({
  declarations: [
    CourtEditComponent,
    CourtNewComponent,
    CourtEventsComponent,
    EventNewComponent,
    EventsDisplayComponent,
    EventsMapComponent,
    EventsNearbyComponent,
    CourtEditDetailsComponent,
    DeleteDialogComponent,
    HallsComponent,
    HallEditComponent,
    HallEventsListComponent,
    HallNewComponent,
    HallsListComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    EventsRoutingModule,
    MatButtonModule,
    MatButtonToggleModule,
    MapComponent,
    ControlComponent,
    NavigationControlDirective,
    MarkerComponent,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressBarModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatListModule,
    MatSliderModule,
    MatExpansionModule,
    MatIconModule,
    MatMenuModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class EventsModule { }
